export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export const validateSetting = (values) => {
  const errors = {};

  const minAge = 14;
  const maxAge = 100;

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.surname) {
    errors.surname = 'Required';
  }

  if (!values.age) {
    errors.age = 'Required';
  } else if (values.age < minAge || values.age > maxAge) {
    errors.age = `You have to choose age from ${minAge} to ${maxAge}`;
  }

  if (!values.city) {
    errors.city = 'Required';
  }

  return errors;
}

export const validateNewPost = (values) => {
  const errors = {};
  const newPostMaxLength = 50;

  if (!values.newPostText) {
    errors.newPostText = 'You cannot post nothing';
  } else if (values.newPostText.length > newPostMaxLength) {
    errors.newPostText = `Too much symbols. Max count - ${newPostMaxLength}`;
  }

  return errors;
};

export const validateRegister = (values) => {
  const errors = {};

  const minAge = 14;
  const maxAge = 100;

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  // else if (values.password.length < 6) {
  //   errors.password = 'Must be 6 characters or more';
  // } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
  //   errors.password = 'Must be at list 1 big letter, 1 small letter and 1 digit';
  // } else if (/\W/.test(values.password)) {
  //   errors.password = 'Only letters and digits are supported';
  // }

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.surname) {
    errors.surname = 'Required';
  }

  if (!values.age) {
    errors.age = 'Required';
  } else if (values.age < minAge || values.age > maxAge) {
    errors.age = `You have to choose age from ${minAge} to ${maxAge}`;
  }

  if (!values.city) {
    errors.city = 'Required';
  }

  return errors;
};


export const required = value => {
  if (value) return undefined
  return 'Field is required'
}

export const maxLengthCreator = maxLength => value => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`
  return undefined
}

export const validateNewMessage = (values) => {
  const errors = {};

  const maxMessageLength = 50;

  if (!values.newMessageBody) {
    errors.newMessageBody = 'Required';
  } else if (values.newMessageBody.length > maxMessageLength) {
    errors.newMessageBody = `Message length must be less than ${maxMessageLength}`;
  }

  return errors;
};



