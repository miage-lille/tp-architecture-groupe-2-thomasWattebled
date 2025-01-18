import { IUserRepository } from 'src/users/ports/user-repository.interface';
import { User } from 'src/users/entities/user.entity';

export class InUserRepository implements IUserRepository {
  private database: User[] = [];

  constructor(initialUsers: User[] = []) {
    this.database = initialUsers;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.database.find(user => user.props.id === id);
    return user || null;
  }

  async save(user: User): Promise<void> {
    this.database.push(user);
  }

}
