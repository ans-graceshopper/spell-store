import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GOT_USER_ORDERS = 'GOT_USER_ORDERS'

const initialState = []

export const gotUserOrders = userOrders => ({type: GOT_USER_ORDERS, userOrders})

export const getUserOrders = id => async dispatch => {
  try {
    console.log(dispatch)
    const res = await axios.get(`/api/users/${id}/orders`)
    dispatch(gotUserOrders(res.data))
  } catch (e) {
    console.error(e)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER_ORDERS:
      return action.userOrders

    default:
      return state
  }
}
