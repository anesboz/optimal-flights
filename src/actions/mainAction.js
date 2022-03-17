import { getPricesPeriod } from "utils/prices"
import { SET_FLIGHT, FETCH_TRANSAVIA, LOADING, FETCH_FAILED, SET_VOL_ALLER } from "./types"


export const getData = (depart_airport, destination_airport, from_date, nb_days, retourBool) => async  (dispatch) => {
  dispatch({
    type: SET_FLIGHT,
    payload: { depart_airport, destination_airport, from_date, nb_days, retourBool },
  })
  dispatch({
    type: LOADING,
    payload: true,
  })
  try {
    const dataAller = await getPricesPeriod(depart_airport, destination_airport, from_date, nb_days)
    const dataRetour = await getPricesPeriod(destination_airport, depart_airport, from_date, nb_days)
    dispatch({
      type: FETCH_TRANSAVIA,
      payload: { aller: dataAller, retour: dataRetour },
    })
  } catch (error) {
    dispatch({
      type: FETCH_FAILED,
      payload: error,
    })
    console.log(error)
  }
  dispatch({
    type: LOADING,
    payload: false,
  })
}


export const setVolAller = (volAller) => async (dispatch) => {
  dispatch({
    type: SET_VOL_ALLER,
    payload: volAller,
  })
}
