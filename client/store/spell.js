import axios from 'axios'

const GOT_SPELLS = 'GOT_SPELLS'
const ADD_SPELL = 'ADD_SPELL'

export const gotSpells = spells => ({type: GOT_SPELLS, spells})
export const addSpell = spellData => ({type: ADD_SPELL, spellData})

export const getSpells = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/spells')
    dispatch(gotSpells(data))
  } catch (e) {
    console.error(e)
  }
}

export const postSpell = spellData => async dispatch => {
  try {
    const {data} = await axios.post('/api/spells', spellData)
    dispatch(addSpell(data))
  } catch (e) {
    console.error(e)
  }
}

const initialState = []

const spellReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SPELLS: {
      return action.spells
    }
    case ADD_SPELL: {
      return [...state.spells, action.spellData]
    }
    default: {
      return state
    }
  }
}

export default spellReducer
