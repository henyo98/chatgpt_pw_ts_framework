import { BaseAPI } from '@core/base/BaseAPI';
import { URLS } from '@core/constants/urls';
import { UserSchema, UsersListSchema } from '../schemas/user.schema';

export class UsersAPI extends BaseAPI {
  getUsers() {
    return this.get(`${URLS.api}/users`, UsersListSchema);
  }
  getUser(id:number) {
    return this.get(`${URLS.api}/users/${id}`, UserSchema);
  }
}