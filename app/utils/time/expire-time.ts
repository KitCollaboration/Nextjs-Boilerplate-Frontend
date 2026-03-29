export const getExpireMin = (date: string): { min: number; sec: number } => {
  const timeLeft = { min: 0, sec: 0 };

  const deltaTime = Date.parse(date) - Date.now();

  const totalSecond = deltaTime / 1000;

  const minuteLeft = Math.max(Math.floor(totalSecond / 60), 0);

  const secLeft = Math.max(Math.floor(totalSecond % 60), 0);

  timeLeft.min = minuteLeft;
  timeLeft.sec = secLeft;
  return timeLeft;
};
