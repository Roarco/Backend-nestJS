import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

import { HttpModule } from '@nestjs/axios';
//import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import configuration from './config/configuration';
//import { configuration } from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [configuration],
      isGlobal: true,
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const tasks = await http.get(
    //       'https://jsonplaceholder.typicode.com/todos',
    //     );
    //     const data = await (await firstValueFrom(tasks)).data;
    //     return data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
