import ActionTypes from './action-types'
import produce from 'immer'

const initialState = {
  loading: false,
  categoryData: null,
  errMessage: null,
  categoryTitle: null
}

//Immer library is used for direct mutation to state object
const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA:
      state.loading = true
      state.errMessage = null
      return state
    case ActionTypes.FETCH_DATA_SUCCESS:
      state.loading = false
      state.categoryData = action.payload.categoryData
      state.categoryTitle = action.payload.categoryTitle
      return state
    case ActionTypes.FETCH_DATA_ERROR:
      state.loading = false
      state.errMessage = action.payload.errMessage
      return state
    default:
      return state
  }
}, initialState)

export default reducer