
import { ZboroviAPI } from './zboroviApi';

export type APIClients = {
  zborovi: ZboroviAPI;
};

// Factory function (optional) if you want to create all clients with a given context
export const createApiClients = (context: any): APIClients => {
  return {
    zborovi: new ZboroviAPI(context),
  };
};