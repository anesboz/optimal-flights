export function getX(data) {
  if (!data) return []
  // return data.map(elm => elm.date + ` `+ elm.horaire)
  return data.map((elm) => elm.date.split(` `)[0])
}
/*
o.date = dateformat(new Date(date), `yyyy-mm-dd ddd`)
o.time = start + ` -> ` + end
o.totalPriceOnePassenger = vol.pricingInfoSum.totalPriceOnePassenger
o.href = vol.deeplink.href
o.departureDateTime = vol.outboundFlight.departureDateTime
o.arrivalDateTime = vol.outboundFlight.arrivalDateTime
*/
export function getY(data) {
  if (!data) return []
  return data.map((elm) =>
    elm.departureDateTime
      ? [new Date(elm.departureDateTime).getTime(), elm.totalPriceOnePassenger]
      : [null, null]
  )
}

export function addMath(series) {
  var minArr = []
  var maxArr = []
  series.map(({ data }) => {
    minArr.push(Math.min(...data.filter((e) => e)))
    maxArr.push(Math.max(...data.filter((e) => e)))
  })
  return [
    ...series,
    {
      name: `Min`,
      data: series[0].data.map((_) => Math.min(...minArr)),
    },
    {
      name: `Max`,
      data: series[0].data.map((_) => Math.max(...maxArr)),
    },
  ]
}
