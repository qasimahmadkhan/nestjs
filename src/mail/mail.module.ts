import { Module } from '@nestjs/common';
import { MailService } from './mailservice';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
