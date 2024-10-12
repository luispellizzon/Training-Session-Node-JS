class DateValidatorAdapter {
  isValid(value) {
    try {
      if (!value) {
        return false;
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return false;
      }
      return true;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return false;
    }
  }
}

module.exports = DateValidatorAdapter;
