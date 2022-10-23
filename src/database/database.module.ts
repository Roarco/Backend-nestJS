import { Module, Global } from '@nestjs/common';

const API_key = '54564654';
const API_key_PROD = 'Prod54564654';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? API_key_PROD : API_key,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
