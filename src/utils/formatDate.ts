const formatDate = (input: string | number | Date, locale = 'ko-KR') => {
  const date = new Date(input);

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default formatDate;
