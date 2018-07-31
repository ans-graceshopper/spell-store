import axios from 'axios'

const GOT_CART = 'GOT_CART',
  EDITED_CART = 'EDIT_CART',
  REMOVED_FROM_CART = 'REMOVED_FROM_CART',
  ADDED_TO_CART = 'ADDED_TO_CART'

export const gotCart = cart => ({type: GOT_CART, cart})
export const editedCart = spellDetails => ({
  type: EDITED_CART,
  spell: spellDetails[0],
  spellorders: spellDetails[1],
})
export const removedFromCart = spellId => ({type: REMOVED_FROM_CART, spellId})
export const addedToCart = spell => ({type: ADDED_TO_CART, spell})

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  } catch (e) {
    console.error(e)
  }
}

export const addToCart = (spell, quantity) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${spell.id}`, {quantity})
    dispatch(addedToCart(data))
  } catch (e) {
    console.error(e)
  }
}

export const removeFromCart = spell => async dispatch => {
  try {
    await axios.delete(`/api/cart/${spell.id}`)
    dispatch(removedFromCart(spell.id))
  } catch (e) {
    console.error(e)
  }
}

export const editCart = (spell, quantity) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${spell.id}`, {quantity})
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
        if (spell.id === action.spell.id)
          return {...action.spell, spellorders: action.spellorders}
        else return spell
      })
      return {...cart, spells: updatedSpells}
    }
    case REMOVED_FROM_CART: {
      const updatedSpells = cart.spells.filter(
        spell => spell.id !== +action.spellId
      )
      return {...cart, spells: updatedSpells}
    }
    case ADDED_TO_CART: {
      return {...cart, spells: [...cart.spells, action.spell]}
    }
    default: {
      return cart
    }
  }
}

export default cartReducer
