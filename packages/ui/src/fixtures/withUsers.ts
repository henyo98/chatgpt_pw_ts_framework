import { test } from './authFixtures';
import { Role } from '@core/constants/domain';

export function withUsers(users: Role[], cb: (user: Role) => void) {
  users.forEach(user => {
    test.describe(`${user}`, () => cb(user));
  });
}