import axios from 'axios'

// ACTION TYPES
const GOT_ALL_SPELLS = 'GOT_ALL_SPELLS',
  GOT_ORDER_SPELLS = 'GOT_ORDER_SPELLS',
  CREATED_SPELL = 'CREATED_SPELL',
  UPDATED_SPELL = 'UPDATED_SPELL'

// ACTION CREATORS
export const gotAllSpells = spells => ({type: GOT_ALL_SPELLS, spells})
export const gotOrderSpells = spells => ({type: GOT_ORDER_SPELLS, spells})
export const createdSpell = spell => ({type: CREATED_SPELL, spell})
export const updatedSpell = spell => ({type: UPDATED_SPELL, spell})

// THUNK CREATORS
export const getAllSpells = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/spells')
    dispatch(gotAllSpells(data))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderSpells = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}/spells`)
    dispatch(gotOrderSpells(data))
  } catch (err) {
    console.error(err)
  }
}

export const createSpell = spell => async dispatch => {
  try {
    const {data} = await axios.post('/api/spells', spell)
    dispatch(createdSpell(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateSpell = spell => async dispatch => {
  try {
    const {data} = await axios.put(`/api/spells/${spell.id}`, spell)
    dispatch(updatedSpell(data))
  } catch (err) {
    console.error(err)
  }
}

const initialSpells = []

// to (hopefully) REDUCE confusion, state shall be just called 'spells', since it's just the array of spells, with no other properties or anything, at the moment.

const spellReducer = (spells = initialSpells, action) => {
  switch (action.type) {
    case GOT_ALL_SPELLS: {
      return action.spells
    }
    case GOT_ORDER_SPELLS:
      return action.spells

    case CREATED_SPELL: {
      return [...spells, action.spell]
    }
    case UPDATED_SPELL: {
      return spells
        .filter(spell => spell.id !== action.spell.id)
        .concat([action.spell])
    }

    default: {
      return spells
    }
  }
}

export default spellReducer
