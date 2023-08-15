import 'reflect-metadata';
import { Database } from './main/database/database.connection';
import { CacheDatabase } from './main/database/cache.connection';
import { Server } from './main/service/express.server';

// AGUARDA TUDO SE RESOLVER
Promise.all([Database.connect(), CacheDatabase.connect()]).then(() => {
  Server.listen();
  console.log('Feito');
});
