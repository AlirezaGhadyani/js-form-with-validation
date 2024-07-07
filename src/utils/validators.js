import {
  EMAIL_REGEX,
  LOWER_REGEX,
  SPECIAL_CHAR_REGEX,
  UPPERCASE_REGEX,
} from "../constants/regex";

export const requiredValidator = (value) => !!value;

export const emailValidator = (email) => EMAIL_REGEX.test(email);

export const complexPasswordValidator = (password) => {
  const containsUppercase = (ch) => UPPERCASE_REGEX.test(ch);
  const containsLowercase = (ch) => LOWER_REGEX.test(ch);
  const containsSpecialChar = (ch) => SPECIAL_CHAR_REGEX.test(ch);

  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (
    countOfLowerCase < 1 ||
    countOfUpperCase < 1 ||
    countOfSpecialChar < 1 ||
    countOfNumbers < 1
  )
    return false;

  return true;
};
