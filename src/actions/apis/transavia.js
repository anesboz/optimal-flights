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
    // const formatedDate = dateformat(new Date(date), `yyyy-mm-dd ddd`)
    // if (rv.length > 0) {
    //   rv.map((vol) =>
    //     results.push({
    //       date: formatedDate,
    //       ...vol,
    //     })
    //   )
    // } else {
    //   results.push({
    //     date: formatedDate,
    //     horaire: null,
    //     prix: null,
    //     href: null,
    //   })
    // }
    // results.push(rv)

    i++
  }
  return [].concat.apply([], results)
}

export function getPrices(origin, destination, originDepartureDate) {
  originDepartureDate = dateformat(originDepartureDate, `yyyymmdd`)
  const url = `https://api.transavia.com/v1/flightoffers/?origin=${origin}&destination=${destination}&originDepartureDate=${originDepartureDate}`
  return axios({
    method: "get",
    url: url,
    headers: { apiKey: API_KEY },
  })
  // .then((res) => {
  //   let start, end, horaire, prix, href
  //   let o = { horaire, prix, href }
  //   if (!res.data) return resolve(o)
  //   resolve(
  //     res.data.flightOffer.map((vol) => {
  //       const o = {}
  //       start = dateformat(
  //         new Date(vol.outboundFlight.departureDateTime),
  //         `HH:MM`
  //       )
  //       end = dateformat(
  //         new Date(vol.outboundFlight.arrivalDateTime),
  //         `HH:MM`
  //       )
  //       o.horaire = start + ` -> ` + end
  //       o.prix = vol.pricingInfoSum.totalPriceOnePassenger
  //       o.href = vol.deeplink.href
  //       return o
  //     })
  //   )
  // })
  // .catch((err) => {
  //   try {
  //     console.log(err.response.status + ` ` + err.response.statusText)
  //   } catch (error) {
  //     console.log(err)
  //   }
  //   resolve([])
  // })
}
