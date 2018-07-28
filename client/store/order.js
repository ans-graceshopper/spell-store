import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'

export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders,
})

export const getOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(gotOrders(data))
  } catch (err) {
    console.error(err)
  }
}

const initialOrders = []

const orderReducer = (orders = initialOrders, action) => {
  switch (action.type) {
    case GOT_ORDERS: {
      return action.orders
    }
    default: {
      return orders
    }
  }
}

export default orderReducer
