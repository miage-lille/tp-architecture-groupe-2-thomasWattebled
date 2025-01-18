import { Webinar } from 'src/webinars/entities/webinar.entity';

export interface IWebinarRepository {

  create(webinar: Webinar): Promise<void>;
  findByID(webinarId:string): Promise<Webinar>;

}
