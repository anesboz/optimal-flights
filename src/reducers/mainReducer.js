import {
  LOADING,
  SET_QUERY,
  SET_FLIGHTS,
  SET_FLIGHT1,
  SET_FLIGHT2,
} from "actions/types"
import axios from "axios"

const initalState = {
  loading: false,
  query: {
    depart_airport: ``,
    destination_airport: ``,
    originDepartureDate: new Date(),
    nbDays: 1,
  },
  flights: [
    {
      company: ``,
      outboundFlights: [],
      returnFlights: [],
    },
  ],
  flight1: {},
  flight2: {},
}

export default (state = initalState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload }

    case SET_QUERY:
      return { ...state, query: { ...action.payload } }

    case SET_FLIGHTS:
      return { ...state, flights: action.payload }
    case SET_FLIGHT1:
      return { ...state, flight1: action.payload }
    case SET_FLIGHT2:
      return { ...state, flight2: action.payload }

    // case SET_FLIGHT:
    //   return { ...state, vol: action.payload }

    // case SET_VOL_ALLER:
    //   console.log(`🚩 . SET_VOL_ALLER`)
    //   const { seriesIndex, dataPointIndex } = action.payload
    //   console.log(`🚩 . action.payload`, action.payload)
    //   if (seriesIndex === 0) {
    //     // selecting vol aller
    //     return { ...state, chosenAller: dataPointIndex }
    //   }
    //   if (seriesIndex === 2) {
    //     // selecting vol retour
    //     return { ...state, chosenRetour: dataPointIndex }
    //   }
    //   return state

    default:
      return state
  }
}
