import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, subFields } from './event.schema';
import { Model } from 'mongoose';
import {
  CreateEventDto,
  EventDatesInput,
  UpdateEventDto,
} from './dto/events.dto';
import {
  notFoundMessage,
  QueryBy,
  SearchedEntity,
} from './../helpers/not-found.helpers';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel
      .find()
      .populate([subFields.attendants, subFields.creator])
      .sort({ startDate: 1 })
      .exec();
  }

  async findById(eventId: string): Promise<Event> {
    const event = await this.eventModel
      .findById(eventId)
      .populate([subFields.attendants, subFields.creator])
      .exec();
    if (!event) {
      throw new NotFoundException(
        notFoundMessage(SearchedEntity.Event, QueryBy.Id, eventId),
      );
    }

    return event;
  }

  async findByDate(dates: EventDatesInput): Promise<Event[]> {
    const dateCondition = {
      $gte: dates.fromDate,
    };
    if (dates?.toDate) {
      dateCondition['$lte'] = dates.toDate;
    }

    const events = await this.eventModel
      .find({
        startDate: dateCondition,
      })
      .populate([subFields.attendants, subFields.creator])
      .sort({ startDate: 1 })
      .exec();
    if (!events?.length) {
      return [];
    }

    return events;
  }

  async create(createEventInput: CreateEventDto): Promise<Event> {
    const createdEvent = await new this.eventModel({
      ...createEventInput,
      active: true,
      createdDate: new Date().toISOString(),
      attendants: [],
    }).save();

    return createdEvent;
  }

  async delete(eventId: string, userId: string): Promise<Event> {
    const eventToDelete = await this.eventModel
      .findById(eventId)
      .populate(subFields.creator)
      .exec();

    if (!eventToDelete) {
      throw new NotFoundException(
        notFoundMessage(SearchedEntity.Event, QueryBy.Id, eventId),
      );
    } else if (eventToDelete.creator.id !== userId) {
      throw new UnauthorizedException();
    }

    return this.eventModel.findByIdAndRemove(eventId);
  }

  async update(updateEventInput: UpdateEventDto, userId: string) {
    const eventToUpdate = await this.eventModel
      .findById(updateEventInput.eventId)
      .populate(subFields.creator)
      .exec();

    if (!eventToUpdate) {
      throw new NotFoundException(
        notFoundMessage(
          SearchedEntity.Event,
          QueryBy.Id,
          updateEventInput.eventId,
        ),
      );
    } else if (eventToUpdate.creator.id !== userId) {
      throw new UnauthorizedException();
    }

    const { eventId, ...fields } = updateEventInput;
    return this.eventModel
      .findByIdAndUpdate(eventId, { ...fields }, { new: true })
      .populate([subFields.creator, subFields.attendants])
      .exec();
  }
}
