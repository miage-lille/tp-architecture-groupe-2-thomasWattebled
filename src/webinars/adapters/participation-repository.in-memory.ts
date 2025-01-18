import { IParticipationRepository } from '../ports/participation-repository.interface';
import { Participation } from '../entities/participation.entity';
export class InParticipationRepository implements IParticipationRepository {
  constructor(public database: Participation[] = []) {}
  
    async findByWebinarId(webinarId: string): Promise<Participation[]> {
        const participations = this.database.filter(participation => participation.props.webinarId === webinarId);
        return participations;
    }

    async save(participation: Participation): Promise<void> {
        this.database.push(participation)
    }
  
}
