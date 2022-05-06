import axios from "axios"
import dateformat from "dateformat"
import { getNextDay } from "utils/timeManager.js"
import { API_KEY } from "variables/contants.js"

export function fetchTransavia(query) {
  return Promise.all([getPricesPeriod(query), getPricesPeriod(query, true)])
}

export async function getPricesPeriod(query, wayBack = false) {
  const { origin, destination, originDepartureDate, nbDays } = query
  const results = []

  let i = 0
  var date = originDepartureDate
  while (i < nbDays) {
    const res = await getPrices(
      wayBack ? destination : origin,
      wayBack ? origin : destination,
      date
    )

    if (res.status === 200) {
      results.push(
        res.data.flightOffer.map((vol) => {
          const o = {}
          const start = dateformat(
            new Date(vol.outboundFlight.departureDateTime),
            `HH:MM`
          )
          const end = dateformat(
            new Date(vol.outboundFlight.arrivalDateTime),
            `HH:MM`
          )
          o.date = dateformat(new Date(date), `ddd yyyy-mm-dd`)
          o.time = start + `  → ` + end
          o.totalPriceOnePassenger = vol.pricingInfoSum.totalPriceOnePassenger
          o.href = vol.deeplink.href
          o.departureDateTime = vol.outboundFlight.departureDateTime
          o.arrivalDateTime = vol.outboundFlight.arrivalDateTime
          return o
        })
      )
    } else {
      results.push([
        {
          date: dateformat(new Date(date), `yyyy-mm-dd ddd`),
          time: null,
          totalPriceOnePassenger: null,
          href: null,
        },
      ])
    }
    date = getNextDay(date)
    i++
  }
  return [].concat.apply([], results)
}

export function getPrices(origin, destination, originDepartureDate) {
  originDepartureDate = dateformat(originDepartureDate, `yyyymmdd`)
  const url = `https://api.transavia.com/v1/flightoffers/?origin=${origin}&destination=${destination}&originDepartureDate=${originDepartureDate}`
  console.log(`🚩 . url`, url)
  return axios({
    method: "get",
    url: url,
    headers: { apiKey: API_KEY },
  })
}
