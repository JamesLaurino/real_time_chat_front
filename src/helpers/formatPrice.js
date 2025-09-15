export const formatPrice = (price, currency = '€') => {
  if (typeof price !== 'number') {
    return `${currency}0`;
  }
  
  return `${currency}${price.toFixed(0)}`;
};

export const formatPriceWithPeriod = (price, period = 'month', currency = '€') => {
  return `${formatPrice(price, currency)}/${period}`;
};

export const calculateSavings = (monthlyPrice, annualPrice) => {
  const yearlyIfMonthly = monthlyPrice * 12;
  const savings = yearlyIfMonthly - annualPrice;
  const savingsPercentage = (savings / yearlyIfMonthly) * 100;
  
  return {
    amount: savings,
    percentage: Math.round(savingsPercentage),
    yearlyIfMonthly
  };
};
