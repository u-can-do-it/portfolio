class InputValidation {
  constructor(value) {
    this.value = value;
    this.isValid = null;
    this.errMessage = [];
  }

  validate(isValid, errMessage) {
    if ((this.isValid === null || this.isValid) && isValid === true) {
      this.isValid = isValid;
    } else if (isValid === false) {
      this.isValid = isValid;
      this.errMessage.push(errMessage);
    }
    return this;
  }

  minLength(minLength) {
    const isValid = this.value.length >= minLength;
    const errMessage = `Minimum ${minLength} characters.`;
    return this.validate(isValid, errMessage);
  }

  emali() {
    const emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailRegExp.test(this.value);
    const errMessage = "It is not a valid email.";
    return this.validate(isValid, errMessage);
  }
}

export default InputValidation;
