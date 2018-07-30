import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATED_USER = 'UPDATE_USER'
const GOT_USER_ORDERS = 'GOT_USER_ORDERS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updatedUser = user => ({type: UPDATED_USER, user})
const gotUserOrders = userOrders => ({type: GOT_USER_ORDERS, userOrders})

/**
 * THUNK CREATORS
 */

export const getUserOrders = async (dispatch, id) => {
  try {
    console.log(dispatch)
    const res = await axios.get(`/api/users/${id}/orders`)
    console.log('getUserOrders res.data: ', res.data)
    return dispatch(gotUserOrders({orders: res.data}))
  } catch (e) {
    console.error(e)
  }
}

export const updateUser = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/user/${user.id}`, user)
    dispatch(updatedUser(data))
  } catch (e) {
    console.error(e)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
// method is form name, so login route or signup route
export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GOT_USER_ORDERS:
      return action.user.orders
    case UPDATED_USER: {
      return action.user
    }
    default:
      return state
  }
}
