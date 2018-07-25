import axios from 'axios'

const GOT_SPELLS = 'GOT_SPELLS',
  CREATED_SPELL = 'CREATED_SPELL',
  UPDATED_SPELL = 'UPDATED_SPELL'

export const gotSpells = spells => ({type: GOT_SPELLS, spells})
export const createdSpell = spell => ({type: CREATED_SPELL, spell})
export const updatedSpell = spell => ({type: UPDATED_SPELL, spell})

export const getSpells = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/spells')
    dispatch(gotSpells(data))
  } catch (e) {
    console.error(e)
  }
}

export const createSpell = spell => async dispatch => {
  try {
    const {data} = await axios.post('/api/spells', spell)
    dispatch(createdSpell(data))
  } catch (e) {
    console.error(e)
  }
}

export const updateSpell = spell => async dispatch => {
  try {
    const {data} = await axios.put(`/api/spells/${spell.id}`, spell)
    dispatch(updatedSpell(data))
  } catch (e) {
    console.error(e)
  }
}

const initialSpells = []

// to (hopefully) REDUCE confusion, state shall be just called 'spells', since it's just the array of spells, with no other properties or anything, at the moment.

const spellReducer = (spells = initialSpells, action) => {
  switch (action.type) {
    case GOT_SPELLS: {
      return action.spells
    }
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
