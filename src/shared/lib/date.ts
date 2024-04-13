const deef :Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Los_Angeles' };

export const dateToString = (date: Date, options: Intl.DateTimeFormatOptions = deef) => {
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};
