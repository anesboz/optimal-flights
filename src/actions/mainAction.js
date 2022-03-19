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
    console.log(`🚩 . flights`, flights)
    dispatch({ type: SET_FLIGHTS, payload: flights })
    dispatch({ type: LOADING, payload: false })
  }).catch(err=> console.log(err))

  // dispatch({
  //   type: SET_FLIGHT,
  //   payload: {
  //     depart_airport,
  //     destination_airport,
  //     from_date,
  //     nb_days,
  //   },
  // })
  // try {
  //   const aller = await getPricesPeriod(
  //     depart_airport,
  //     destination_airport,
  //     from_date,
  //     nb_days
  //   )
  //   const retour = await getPricesPeriod(
  //     destination_airport,
  //     depart_airport,
  //     from_date,
  //     nb_days
  //   )
  //   const inf_aller = Y_eq_Min(aller.map((e) => e.prix))
  //   const inf_retour = Y_eq_Min(retour.map((e) => e.prix))

  //   dispatch({
  //     type: FETCH_APIS,
  //     payload: { aller, inf_aller, retour, inf_retour },
  //   })
  // } catch (error) {
  //   dispatch({
  //     type: FETCH_FAILED,
  //     payload: error,
  //   })
  //   console.log(error)
  // }
}

export const setVolAller = (volAller) => async (dispatch) => {
  // dispatch({
  //   type: SET_VOL_ALLER,
  //   payload: volAller,
  // })
}

function Y_eq_Min(array) {
  const t = array.filter((n) => n)
  const min = Math.min(...t) ?? 0
  if (t.length < 1) min = 0
  return array.map((e) => min)
}
