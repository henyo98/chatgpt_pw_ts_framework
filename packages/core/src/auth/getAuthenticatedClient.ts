import { request } from '@playwright/test';
import { ZboroviAPI } from '@api/clients/zboroviApi';
// Helper to create authenticated clients for a given user
export async function getAuthenticatedClient(role: string) {
  const storagePath = `cookie-storage/${role}.json`;

  const ctx = await request.newContext({
    storageState: storagePath,
  });

  return {
    zborovi: new ZboroviAPI(ctx),
    context: ctx, // optional, in case you need it
  };
}