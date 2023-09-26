export function createDate(dt, type) {
  let day = new Date(dt * 1000);
  if (type === 'long') {
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    let longDateArr = day.toLocaleString('en-us', options).split(', ');
    let longDate = `${longDateArr[0]}, ${longDateArr[1]} ${longDateArr[2]}`;
    return longDate;
  } else {
    return day.toLocaleString('en-us', {
      weekday: 'long'
    });
  }
}
