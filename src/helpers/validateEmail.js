export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmailWithMessage = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!validateEmail(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};
