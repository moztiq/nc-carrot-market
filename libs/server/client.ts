import { PrismaClient } from '@prisma/client';
import * as process from 'process';

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
