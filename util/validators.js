module.exports.validateSignUpInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (
    !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
  ) {
    errors.password =
      "Password must be at least 8 characters long and contain at least one number, one uppercase, and one lowercase";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateToDoInput = (toDoName, body) => {
  const errors = {};
  if (toDoName.trim() === "") {
    errors.toDoName = "Name must not be empty";
  }
  if (body.trim() === "") {
    errors.body = "Body must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateDateInput = (time, day) => {
  const dateErrors = {};
  if (!time) {
    dateErrors.time = "Must select a time";
  }
  if (!day) {
    dateErrors.date = "Must select a valid date";
  }

  return {
    dateErrors,
    validDate: Object.keys(dateErrors).length < 1,
  };
};

module.exports.validateReminderInput = (time, date, body) => {
  const dateErrors = {};
  if (!time) {
    dateErrors.time = "Must select a time";
  }
  if (!date) {
    dateErrors.date = "Must select a valid date";
  }
  if (body.trim() === "") {
      dateErrors.body = "Body must not be empty"
  }

  return {
    dateErrors,
    validDate: Object.keys(dateErrors).length < 1,
  };
};
