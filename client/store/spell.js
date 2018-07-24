import axios from 'axios'

const GOT_SPELLS = 'GOT_SPELLS'

export const gotSpells = spells => ({type: GOT_SPELLS, spells})

export const getSpells = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/spells')
    dispatch(gotSpells(data))
  } catch (e) {
    console.error(e)
  }
}

const initialState = []

const spellReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SPELLS:
      return action.spells
    default:
      return state
  }
}

export default spellReducer
