import axios from 'axios'
import ActionTypes from './action-types'

// const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const ENDPOINT_URL = 'https://today.line.me/id/portaljson'

// const axiosConfig = {
//   headers: { 'Access-Control-Allow-Origin': '*' }
// }

export const fetchData = () => {
  return async (dispatch) => {
    //Initial dispatch to flip loading flag
    dispatch({ type: ActionTypes.FETCH_DATA })

    try {
      const { data: { result } } = await axios.get(ENDPOINT_URL)
      let { categories } = result

      console.log(categories)

      //Modify categories array to easier data structure to work with
      categories = categories.reduce((acc, curr) => {
        //Flattened out templates data
        const flatttenedTemplates = curr.templates.map(({ id, type, sections, title }) => {
          return {
            id,
            subCategoryType: type,
            tagline: title,
            articles: sections[0].articles,
          }
        })

        return {
          ...acc,
          [curr.name.toLowerCase().replace(/\s/g, '')]: [...flatttenedTemplates]
        }
      }, {})

      dispatch({
        type: ActionTypes.FETCH_DATA_SUCCESS,
        payload: {
          categoryData: categories
        }
      })

    } catch (err) {
      dispatch({ type: ActionTypes.FETCH_DATA, payload: { errMessage: err } })
    }
  }
}
