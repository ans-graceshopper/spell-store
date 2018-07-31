import axios from 'axios'
const GOT_ALL_ELEMENTS = 'GOT_ALL_ELEMENTS'

const initialElements = []
export const gotAllElements = elements => ({
  type: GOT_ALL_ELEMENTS,
  elements,
})

export const getAllElements = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/elements`)
    dispatch(gotAllElements(data))
  } catch (err) {
    console.error(err)
  }
}

const elementReducer = (elements = initialElements, action) => {
  switch (action.type) {
    case GOT_ALL_ELEMENTS: {
      return action.elements
    }
    default: {
      return elements
    }
  }
}

export default elementReducer
