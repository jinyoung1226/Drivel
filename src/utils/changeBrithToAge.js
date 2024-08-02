const chageBrithToAge = (brith) => {
  const brithDate = new Date(brith);
  const now = new Date();
  const age = now.getFullYear() - brithDate.getFullYear();
  if (now.getMonth() < brithDate.getMonth() || (now.getMonth() === brithDate.getMonth() && now.getDate() < brithDate.getDate())) {
    return age - 1;
  }
  return age;
}

export default chageBrithToAge;
