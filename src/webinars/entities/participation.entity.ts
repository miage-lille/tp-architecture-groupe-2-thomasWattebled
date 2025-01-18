import { Entity } from 'src/shared/entity';
import { User } from '../../users/entities/user.entity'

type Props = {
  userId: string;
  webinarId: string;
};

export class Participation extends Entity<Props> {

}
