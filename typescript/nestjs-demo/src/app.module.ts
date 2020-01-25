import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// A module is defined by annotating a class with @Module decorator
@Module({
  imports: [TasksModule],
})
export class AppModule {}
