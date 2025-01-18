import { FixedDateGenerator } from 'src/core/adapters/fixed-date-generator';
import { FixedIdGenerator } from 'src/core/adapters/fixed-id-generator';
import { IDateGenerator } from 'src/core/ports/date-generator.interface';
import { IIdGenerator } from 'src/core/ports/id-generator.interface';
import { InMemoryWebinarRepository } from 'src/webinars/adapters/webinar-repository.in-memory';
import { OrganizeWebinars } from 'src/webinars/use-cases/organize-webinar';
import { BookSeat } from './book-seat';
import { InParticipationRepository } from '../adapters/participation-repository.in-memory'; 
import { IWebinarRepository } from '../ports/webinar-repository.interface';
import { InMemoryMailer } from 'src/core/adapters/in-memory-mailer'; 
import { InUserRepository } from 'src/users/adapters/user-repository.in-memory';
import { User } from 'src/users/entities/user.entity';
describe('Feature: Organize webinars', () => {
  let repository: InMemoryWebinarRepository;
  let idGenerator: IIdGenerator;
  let useCase: OrganizeWebinars;
  let dateGenerator: IDateGenerator;
  let useCasebooks: BookSeat;
  let participationRepository: InParticipationRepository;
  let userRepository: InUserRepository;
  let webinarRepository: InMemoryWebinarRepository;
  let mailer:InMemoryMailer;

  const payload = {
    userId: 'user-alice-id',
    title: 'Webinar title',
    seats: 100,
    seatleft: 10,
    startDate: new Date('2024-01-10T10:00:00.000Z'),
    endDate: new Date('2024-01-10T11:00:00.000Z'),
  };



  beforeEach(() => {
    webinarRepository = new  InMemoryWebinarRepository(),
    idGenerator = new FixedIdGenerator();
    dateGenerator = new FixedDateGenerator();
    useCase = new OrganizeWebinars(webinarRepository, idGenerator, dateGenerator);

    participationRepository = new InParticipationRepository(),
    userRepository = new InUserRepository();
    mailer = new InMemoryMailer(),
    useCasebooks = new BookSeat(participationRepository,userRepository,webinarRepository,mailer)
  });

  

  describe('no seat left', () => {
    const webinar = {
      userId: 'user-alice-id',
      title: 'Webinar title',
      seats: 100,
      seatleft: 0,
      startDate: new Date('2024-01-10T10:00:00.000Z'),
      endDate: new Date('2024-01-10T11:00:00.000Z'),
    };
    useCase.execute(webinar);
    const createdWebinar = webinarRepository.database[0];
    const user = new User({
      id: 'user-123',
      email: 'user@example.com',
      password: 'securepassword123',
    });
    const payload = {
      webinarId: 'user-alice-id',
      user: user
    };

    it('should throw an error', async () => {
      await expect(useCasebooks.execute(payload)).rejects.toThrow(
        'Webinar must have at least 1 seat',
      );
    });

    

    
  });





});
