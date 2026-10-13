import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MessageService } from '../../../core/feedback/messages/message.service';
import { LocalStorageService } from '../../../core/storage/local-storage.service';
import { UsersApiService } from '../data-access/users-api.service';
import { IUser } from '../models/user.model';
import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  const users: IUser[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      username: 'alice',
      email: 'alice@example.com',
      address: {
        street: 'Main Street',
        suite: '1',
        city: 'Baku',
        zipcode: 'AZ1000',
        geo: { lat: '0', lng: '0' },
      },
      phone: '1234567890',
      website: 'example.com',
      company: { name: 'Example', catchPhrase: '', bs: '' },
    },
    {
      id: 2,
      name: 'Bob Smith',
      username: 'bob',
      email: 'bob@example.com',
      address: {
        street: 'Second Street',
        suite: '2',
        city: 'Baku',
        zipcode: 'AZ1001',
        geo: { lat: '0', lng: '0' },
      },
      phone: '0987654321',
      website: 'example.org',
      company: { name: 'Example', catchPhrase: '', bs: '' },
    },
  ];

  const usersApi = {
    getUsers: vi.fn(() => of(users)),
  };

  const storage = {
    getValue: vi.fn<() => IUser[] | null>(() => null),
    setValue: vi.fn(),
  };

  const messages = {
    showError: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    storage.getValue.mockReturnValue(null);

    TestBed.configureTestingModule({
      providers: [
        UsersFacade,
        { provide: UsersApiService, useValue: usersApi },
        { provide: LocalStorageService, useValue: storage },
        { provide: MessageService, useValue: messages },
      ],
    });
  });

  it('loads users from the API and persists them', () => {
    const facade = TestBed.inject(UsersFacade);

    facade.loadUsers();

    expect(facade.users()).toEqual(users);
    expect(storage.setValue).toHaveBeenCalledWith('users', users);
  });

  it('uses cached users without requesting the API', () => {
    storage.getValue.mockReturnValue(users);
    const facade = TestBed.inject(UsersFacade);

    facade.loadUsers();

    expect(facade.users()).toEqual(users);
    expect(usersApi.getUsers).not.toHaveBeenCalled();
  });

  it('filters users by name', () => {
    const facade = TestBed.inject(UsersFacade);
    facade.loadUsers();

    facade.setFilter(' alice ');

    expect(facade.filteredUsers()).toEqual([users[0]]);
  });

  it('reports an API error and exposes an empty list', () => {
    usersApi.getUsers.mockReturnValueOnce(throwError(() => new Error('Network error')));
    const facade = TestBed.inject(UsersFacade);

    facade.loadUsers();

    expect(facade.users()).toEqual([]);
    expect(messages.showError).toHaveBeenCalledWith('Не удалось загрузить пользователей');
  });
});
