class AlreadyExistsError extends Error {
  constructor(paramInUse) {
    super();
    this.name = 'Invalid Param';
    this.message = `The ${paramInUse} provided already exists`;
  }
}

module.exports = AlreadyExistsError;
