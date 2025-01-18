export class UserAlreadyParticipate extends Error {
    constructor() {
      super('the user already participate');
      this.name = 'UserAlreadyParticipate';
    }
  }
  