import { fetchTransavia } from "actions/apis/transavia"
import {
  LOADING,
  SET_QUERY,
  SET_FLIGHTS,
} from "./types"

const companiesFetch = {
  transavia: fetchTransavia,
}

export const getFlights = (query) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  dispatch({ type: SET_QUERY, payload: query })
  const arrayOfPromises = query.companies.map((name) =>
    companiesFetch[name](query)
  )
  Promise.all(arrayOfPromises).then((values) => {
    const flights = values.map((val, i) => ({
      company: query.companies[i],
      outboundFlights: val[0],
      returnFlights: val[1],
    }))
    dispatch({ type: SET_FLIGHTS, payload: flights })
    dispatch({ type: LOADING, payload: false })
  }).catch(err=> console.log(err))
}

