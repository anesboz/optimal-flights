import { SET_FLIGHT, FETCH_TRANSAVIA, LOADING, SET_VOL_ALLER } from "actions/types"
import axios from 'axios'

const initalState = {
  aller: [],
  retour: [],
  vol: {},
  loading: false,
  volAller: {}
}

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_TRANSAVIA:
      return { 
        ...state,
        aller : action.payload.aller, 
        retour: action.payload.retour
      }
    case SET_FLIGHT:
      return { ...state, vol: action.payload}

    case LOADING:
      return { ...state, loading: action.payload }
    case SET_VOL_ALLER:
      console.log(`Dans reducers`);
      return { ...state, volAller: action.payload }
    default:
      return state
  }
};