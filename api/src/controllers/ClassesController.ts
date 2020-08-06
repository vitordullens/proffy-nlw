/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

import db from '../database/connection';

import convertHourToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day : number,
  from : string,
  to : string
}

export async function createClasses(request: Request, response: Response) {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = request.body;

  const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
      class_id,
      week_day: scheduleItem.week_day,
      from: convertHourToMinutes(scheduleItem.from),
      to: convertHourToMinutes(scheduleItem.to),
    }));

    await trx('class_schedule').insert(classSchedule);

    await trx.commit();

    return response.status(201).send();
  } catch (error) {
    await trx.rollback();

    return response.status(400).json({
      error: 'Unexpected error while creating new class',
    });
  }
}

export async function indexClasses(request: Request, response: Response) {
  const filters = request.query;

  const week_day = filters.week_day as string;
  const subject = filters.subject as string;
  const time = filters.time as string;

  if (!week_day || !subject || !time) {
    return response.status(400).json({
      error: 'Missing filteres to search classes',
    });
  }

  const timeInMinutes = convertHourToMinutes(time);

  const classes = await db('classes')
    // eslint-disable-next-line func-names
    .whereExists(function () {
      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
    })
    .where('classes.subject', '=', subject)
    .join('users', 'classes.user_id', '=', 'users.id')
    .select(['classes.*', 'users.*']);

  return response.json(classes);
}
