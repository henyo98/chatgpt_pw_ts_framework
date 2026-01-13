import { faker } from '@faker-js/faker';
import { UserDataSchema, UserData } from '../schemas/userData.schema';
export const buildUser=():UserData=>UserDataSchema.parse({
 firstName:faker.person.firstName(),
 lastName:faker.person.lastName(),
 email:faker.internet.email().toLowerCase(),
 password:faker.internet.password({length:12})
});