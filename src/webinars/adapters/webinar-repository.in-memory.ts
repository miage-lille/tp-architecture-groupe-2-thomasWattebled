import { Webinar } from 'src/webinars/entities/webinar.entity';
import { IWebinarRepository } from 'src/webinars/ports/webinar-repository.interface';
import { WebinarNotFoundException } from "../exceptions/WebinarNotFoundException";
export class InMemoryWebinarRepository implements IWebinarRepository {
  constructor(public database: Webinar[] = []) {}
  async create(webinar: Webinar): Promise<void> {
    this.database.push(webinar);
  }

  async findByID(webinarId: string): Promise<Webinar> {
     this.database.map(elt => {
      if(elt.props.id===webinarId) return elt
    })
    throw new WebinarNotFoundException();;
  }
}
