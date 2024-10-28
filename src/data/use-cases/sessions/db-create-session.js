class DbCreateSession {
  #createSessionRepository;
  #createPaymentTransactionRepository;
  constructor(createSessionRepository, createPaymentTransactionRepository) {
    this.#createSessionRepository = createSessionRepository;
    this.#createPaymentTransactionRepository = createPaymentTransactionRepository;
  }

  async create(session) {
    const transaction_id = await this.#createPaymentTransactionRepository.create({
      cardNumber: session.cardNumber,
      cvv: session.cvv,
      expiryDate: session.expiryDate,
    });
    delete session.cardNumber;
    delete session.cvv;
    delete session.expiryDate;

    await this.#createSessionRepository.create({
      ...session,
      bookingDate: new Date(session.bookingDate),
      transaction_id,
    });
  }
}

module.exports = DbCreateSession;
