import { BaseAPI } from '@core/base/BaseAPI';
import { URLS } from '@core/constants/urls';
import { ZboroviTopSchema } from '@api/schemas/zbor.schema';
import { ENDPOINTS } from '@core/constants/endpoints';

export class ZboroviAPI extends BaseAPI {
  getZborovi() {
    return this.get(`${URLS.api}${ENDPOINTS.zborovi}?page=1&per_page=100`, ZboroviTopSchema); //TODO: Schema error, fix this
  }
}