import { test } from './authFixtures';
import { Role } from '@core/constants/domain';

export function withUserPairs(pairs: [Role, Role][], cb: (a: Role, b: Role) => void) {
  pairs.forEach(([a,b]) => test.describe(`${a} → ${b}`, () => cb(a,b)));
}