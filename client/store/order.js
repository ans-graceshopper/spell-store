import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'

export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders,
})

export const gotOrder = order => ({
  type: GOT_ORDER,
  order,
})

export const getOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(gotOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const getOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOrder(data))
  } catch (err) {
    console.error(err)
  }
}

const initialOrders = {userOrders: [], currentOrder: {}}

const orderReducer = (orders = initialOrders, action) => {
  switch (action.type) {
    case GOT_ORDERS: {
      return {...orders, userOrders: action.orders}
    }
    case GOT_ORDER: {
      return {...orders, currentOrder: action.order}
    }
    default: {
      return orders
    }
  }
}

export default orderReducer
