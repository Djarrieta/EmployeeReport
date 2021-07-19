export const capitalize = (text: string): string =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const dateFormat = (date: Date): string => {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');

  const result = `${year}-${month}-${day}T${hour}:${min}`;
  return result;
};
