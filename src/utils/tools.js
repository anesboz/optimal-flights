export function getNextDay(date) {
  var nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay
}

export function getUrl(origin, destination, originDepartureDate) {
  return `https://api.transavia.com/v1/flightoffers/?origin=${origin}&destination=${destination}&originDepartureDate=${originDepartureDate}`
}
