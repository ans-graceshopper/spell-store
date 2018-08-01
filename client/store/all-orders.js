import axios from 'axios'

// ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

const initialOrders = []

// ACTION CREATORS
export const gotAllOrders = orders => ({
  type: GOT_ALL_ORDERS,
  orders,
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

const allOrderReducer = (orders = initialOrders, action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS: {
      return action.orders
    }

    default: {
      return orders
    }
  }
}

export default allOrderReducer
