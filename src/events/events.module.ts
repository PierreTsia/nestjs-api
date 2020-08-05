import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from './event.schema';
import { EventsResolvers } from './events.resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventsService, EventsResolvers],
})
export class EventsModule {}
