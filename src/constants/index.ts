enum BodyError {
  REQUIRED = 'This field is required',
  STRING = 'Field value must be a string',
  NUMBER = 'Field value must be a number',
  EMAIL = 'Invalid email',
  PASSWORD = 'Field value must be greater than 8 characters, include numbers and special characters'
}

export { BodyError };
