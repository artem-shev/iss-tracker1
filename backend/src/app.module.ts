import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import TrackerModule from './modules/tracker/tracker.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TrackerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
