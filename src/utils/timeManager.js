export function getNextDay(date: Date) {
  var nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay
}

export function getNDays(date: Date, nbDays: int) {
  const results = []
  let i = 0
  while (i < nbDays) {
    results.push(date)
    date = getNextDay(date)
    i++
  }
  return results
}

