class SessionAlreadyExistsError extends Error {
  constructor() {
    super();
    this.name = 'SessionAlreadyExistsError';
    this.message = `You already have a session booked at this time.\nPlease, try another date.`;
  }
}

module.exports = SessionAlreadyExistsError;
