import { IMailer } from 'src/core/ports/mailer.interface';
import { Executable } from 'src/shared/executable';
import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/ports/user-repository.interface';
import { IParticipationRepository } from 'src/webinars/ports/participation-repository.interface';
import { IWebinarRepository } from 'src/webinars/ports/webinar-repository.interface';
import { UserAlreadyParticipate } from '../exceptions/user-already-participate';
import { Participation } from '../entities/participation.entity';
type Request = {
  webinarId: string;
  user: User;
};
type Response = void;

export class BookSeat implements Executable<Request, Response> {
  constructor(
    private readonly participationRepository: IParticipationRepository,
    private readonly userRepository: IUserRepository,
    private readonly webinarRepository: IWebinarRepository,
    private readonly mailer: IMailer,
  ) {}
  async execute({ webinarId, user }: Request): Promise<Response> {
    

    const listParticipation = this.participationRepository.findByWebinarId(webinarId) ;
    const webinar = this.webinarRepository.findByID(webinarId);
    
    (await listParticipation).map(elt => { 
      if (elt.props.userId=== user.props.id) 
        throw new UserAlreadyParticipate()})
    if ( (await webinar).props.seatleft<0){
      const participation = new Participation({userId:user.props.id,webinarId:webinarId})
      this.participationRepository.save(participation);
      (await webinar).props.seatleft = (await webinar).props.seatleft -1 ;
      const email = {to: (await webinar).props.organizerId,
        subject: 'nouvelle inscription',
        body: 'une nouvelle personne est inscrite au webinar'};
        this.mailer.send(email)
    }
    
    return;
  }
}
