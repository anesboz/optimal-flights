import axios from "axios"
import dateformat from "dateformat"
import { API_KEY } from "variables/contants.js"
import { myDateFormat} from "../variables/forFormatdate.js"
import { getNextDay, getUrl } from "./tools.js"



export function fetchTransavia(origin, destination, originDepartureDate) {
  return new Promise((resolve, reject) => axios({
    method: 'get',
    url: getUrl(origin, destination, originDepartureDate.replace(/-/g, ``)),
    headers: { apiKey: API_KEY },
  })
    .then(res => resolve(res))
  )
}


export function getPrices(origin, destination, originDepartureDate) : [] {
  return new Promise((resolve, reject) => fetchTransavia(origin, destination, originDepartureDate)
    .then(res => {
      let start, end, horaire, prix, href
      let o = { horaire, prix, href}
      if (!res.data) return resolve(o)
      resolve(res.data.flightOffer.map(vol => {
        const o = {}
        start = dateformat(new Date(vol.outboundFlight.departureDateTime), `HH:MM`)
        end = dateformat(new Date(vol.outboundFlight.arrivalDateTime), `HH:MM`)
        o.horaire = start + ` -> ` + end
        o.prix = vol.pricingInfoSum.totalPriceOnePassenger
        o.href = vol.deeplink.href
        return o
      }))
    })
    .catch(err => {
      try {
        console.log(err.response.status + ` ` + err.response.statusText)
      } catch (error) {
        console.log(err)
      }
      resolve([])
    }))
}

export async function getPricesPeriod(origin, destination, startDate : string, nbDays) {
  let i = 0
  var date = startDate
  const t = []
  while (i < nbDays) {
    const rv = await getPrices(origin, destination, date)
    const formatedDate = dateformat(new Date(date), `${myDateFormat} ddd`)
    if (rv.length > 0) {
      rv.map(vol => t.push({
        date: formatedDate
        , ...vol
      }))
    } else {
      t.push({date: formatedDate, horaire: null, prix: null, href: null})
    }

    date = dateformat(getNextDay(date), myDateFormat)
    i++
  }
  return [].concat.apply([], t)
}

