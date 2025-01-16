import httpService from "./http.service";

/**
 *
 * Check if username meets valid criteria.
 */
export const isValidUsername = async (username: string | null): Promise<boolean>  => {

  if (!username || username.length < 6){
    return false;
  }

  const url = `/user/exists/${username.toLowerCase()}`
  let response = await httpService.get(url)
  return !response.data.exists;
}

/**
 * Check if email is a valid format for email.
 */
export const isValidEmail = (email: string | null): boolean => {

  if (!email) {
    return false;
  }
  // Regular expression for validating an email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the input against the regex pattern
  return emailPattern.test(email);
}

/**
 * Checks if the plain text password meets minimum criteria.
 */
export const isValidPassword = (plainTextPassword: string, confirmPassword: string): 
  {valid: boolean, matchConfirm: boolean ,length: boolean, uppercase: boolean, lowercase: boolean, digits: boolean} => {

  if(!plainTextPassword || !confirmPassword) {
    return {
      valid: false,
      matchConfirm: false,
      length: false,
      uppercase: false,
      lowercase: false,
      digits: false 
    }

  }

  if (plainTextPassword && confirmPassword) { 
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;

    const isValidLength = plainTextPassword.length > 6;
    const isValidUpperCase = uppercasePattern.test(plainTextPassword);
    const isValidLowerCase = lowercasePattern.test(plainTextPassword);
    const isValidDigit = digitPattern.test(plainTextPassword);
    const isValidPassword = isValidLength && isValidUpperCase && isValidLowerCase && isValidDigit;

    const response =  {
      valid: isValidPassword,
      matchConfirm: plainTextPassword == confirmPassword,
      length: isValidLength,
      uppercase: isValidUpperCase,
      lowercase: isValidLowerCase,
      digits: isValidDigit, 
    };

    return response;
  }

  return {
    valid: false,
    matchConfirm: plainTextPassword == confirmPassword,
    length: false,
    uppercase: false,
    lowercase: false,
    digits: false 
  };
}
