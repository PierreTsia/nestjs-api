import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import {
  CreateEventDto,
  UpdateEventDto,
  GqlEvent,
  EventDatesInput,
} from './dto/events.dto';
import { EventsService } from './events.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-authguard.guard';
import { CurrentUser } from '../users/current-user';

@Resolver(of => GqlEvent)
export class EventsResolvers {
  constructor(private eventsService: EventsService) {}

  @Query(returns => [GqlEvent])
  @UseGuards(GqlAuthGuard)
  async events() {
    return this.eventsService.findAll();
  }

  @Query(returns => GqlEvent)
  @UseGuards(GqlAuthGuard)
  async eventById(@Args('eventId') eventId: string) {
    return this.eventsService.findById(eventId);
  }

  @Query(returns => [GqlEvent])
  @UseGuards(GqlAuthGuard)
  async eventsByDate(@Args('eventDates') datesInput: EventDatesInput) {
    return this.eventsService.findByDate(datesInput);
  }

  @Mutation(returns => GqlEvent)
  @UseGuards(GqlAuthGuard)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventDto,
  ) {
    return this.eventsService.create(createEventInput);
  }

  @Mutation(returns => GqlEvent)
  @UseGuards(GqlAuthGuard)
  async deleteEvent(
    @CurrentUser() user: { userId: string },
    @Args('eventId') eventId: string,
  ) {
    return this.eventsService.delete(eventId, user.userId);
  }

  @Mutation(returns => GqlEvent)
  @UseGuards(GqlAuthGuard)
  async updateEvent(
    @CurrentUser() user: { userId: string },
    @Args('updateEventInput') updateEventInput: UpdateEventDto,
  ) {
    return this.eventsService.update(updateEventInput, user.userId);
  }
}
