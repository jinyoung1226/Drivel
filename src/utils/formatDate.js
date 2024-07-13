const formatDate = isoString => {
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);
  return formattedDate.replace('.', '년').replace('.', '월').replace('.', '일');
};

export default formatDate;
