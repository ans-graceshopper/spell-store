import axios from 'axios'

// ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_USER_ORDERS = 'GOT_USER_ORDERS'
const GOT_CURRENT_ORDER = 'GOT_CURRENT_ORDER'

const initialOrders = []

// ACTION CREATORS
export const gotAllOrders = orders => ({
  type: GOT_ALL_ORDERS,
  orders,
})

export const gotUserOrders = orders => ({
  type: GOT_USER_ORDERS,
  orders,
})

export const gotCurrentOrder = order => ({
  type: GOT_CURRENT_ORDER,
  order,
})

// THUNK CREATORS

export const getAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(gotAllOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const getUserOrders = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/orders`)
    dispatch(gotUserOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getCurrentOrder = id => async dispatch => {
  try {
    console.log(dispatch)
    const res = await axios.get(`/api/orders/${id}`)
    const orders = res.data
    dispatch(gotUserOrders(orders))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const orderReducer = (orders = initialOrders, action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS: {
      return action.orders
    }
    case GOT_USER_ORDERS:
      return action.orders

    case GOT_CURRENT_ORDER:
      return action.order

    default: {
      return orders
    }
  }
}

export default orderReducer
