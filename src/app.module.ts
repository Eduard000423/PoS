import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SQL_Module } from './SQL/SQL.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SQL_Module,
  ],
})
export class AppModule {}
