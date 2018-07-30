import axios from 'axios'

const GOT_ORDER_SPELLS = 'GOT_ORDER_SPELLS'

const initialState = []
export const gotOrderSpells = orderSpells => ({
  type: GOT_ORDER_SPELLS,
  orderSpells,
})

export const getOrderSpells = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}/spells`)
    dispatch(gotOrderSpells(data))
  } catch (e) {
    console.error(e)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER_SPELLS:
      return action.orderSpells
    default:
      return state
  }
}
