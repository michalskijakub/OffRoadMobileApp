export const validateEmail = (email: string) => {
  const re = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/;

  return re.test(email);
};

export const validateUsername = (username: string) => {
  return username.length > 4;
};

export const validatePassword = (password: string) => {
  return password.length > 5;
};

export const validateRepeatedPassword = (
  password: string,
  repeatedPassword: string
) => {
  return password === repeatedPassword;
};

export const validateRange = (range: string) => {
  return /[1-9][0-9]*/.test(range) || range === "0";
};
