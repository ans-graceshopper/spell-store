import axios from 'axios'

const GOT_CART = 'GOT_CART'

export const gotCart = cart => ({type: GOT_CART, cart})

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/cart')
    dispatch(gotCart(data))
  } catch (e) {
    console.error(e)
  }
}

const initialCart = []

const cartReducer = (cart = initialCart, action) => {
  switch (action.type) {
    case GOT_CART: {
      return action.cart
    }
    default: {
      return cart
    }
  }
}

export default cartReducer
