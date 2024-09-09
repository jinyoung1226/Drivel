const formatChatTimestamp = dateInput => {
  const now = new Date();
  const inputDate = new Date(dateInput);

  const diffInMilliseconds = now - inputDate;
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  const isToday =
    now.getFullYear() === inputDate.getFullYear() &&
    now.getMonth() === inputDate.getMonth() &&
    now.getDate() === inputDate.getDate();

  if (isToday) {
    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else {
      return `${diffInHours}시간 전`;
    }
  } else {
    const month = inputDate.getMonth() + 1; // months are 0-indexed
    const day = inputDate.getDate();
    return `${month}월 ${day}일`;
  }
};

export default formatChatTimestamp;
