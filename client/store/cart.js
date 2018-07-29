import axios from 'axios'

const GOT_CART = 'GOT_CART'
const EDITED_CART = 'EDIT_CART'

export const gotCart = cart => ({type: GOT_CART, cart})
export const editedCart = spell => ({type: EDITED_CART, spell})

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  } catch (e) {
    console.error(e)
  }
}

export const addToCart = spell => async dispatch => {
  try {
    await axios.put('/api/cart', spell)
    getCart()
  } catch (e) {
    console.error(e)
  }
}

export const removeFromCart = spell => async dispatch => {
  try {
    await axios.delete(`/api/cart/${spell.id}`)
    getCart()
  } catch (e) {
    console.error(e)
  }
}

export const editCart = spell => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${spell.id}`, spell)
    dispatch(editedCart(data))
  } catch (e) {
    console.error(e)
  }
}

export const createCart = () => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart')
    dispatch(gotCart(data))
  } catch (e) {
    console.error(e)
  }
}

const initialCart = {order: {}, spells: []}

const cartReducer = (cart = initialCart, action) => {
  switch (action.type) {
    case GOT_CART: {
      return action.cart
    }

    case EDITED_CART: {
      const updatedSpells = cart.spells.map(spell => {
        if (spell.id === action.spell.id) return action.spell
        else return spell
      })
      return {...cart, spells: updatedSpells}
    }

    default: {
      return cart
    }
  }
}

export default cartReducer
