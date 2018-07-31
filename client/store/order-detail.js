/// NOTE: WE MAY NOT NEED THIS

import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'

export const gotOrder = order => ({
  type: GOT_ORDER,
  order,
})

export const getOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOrder(data))
  } catch (err) {
    console.error(err)
  }
}

const currentOrderReducer = (currentOrder = {}, action) => {
  switch (action.type) {
    case GOT_ORDER: {
      return action.currentOrder
    }
    default: {
      return currentOrder
    }
  }
}

export default currentOrderReducer
