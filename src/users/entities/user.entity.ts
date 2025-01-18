import { Entity } from 'src/shared/entity';
import { Participation } from 'src/webinars/entities/participation.entity';
import { Webinar } from 'src/webinars/entities/webinar.entity';
type UserProps = {
  id: string;
  email: string;
  password: string;
};
export class User extends Entity<UserProps> {

}