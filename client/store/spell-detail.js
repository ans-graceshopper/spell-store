import axios from 'axios'

const GOT_CURRENT_SPELL = 'GOT_CURRENT_SPELL'

export const gotCurrentSpell = currentSpell => ({
  type: GOT_CURRENT_SPELL,
  currentSpell,
})

export const getCurrentSpell = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/spells/${id}`)
    dispatch(gotCurrentSpell(data))
  } catch (e) {
    console.error(e)
  }
}

const currentSpell = (state = {}, action) => {
  switch (action.type) {
    case GOT_CURRENT_SPELL: {
      return action.currentSpell
    }
    default: {
      return state
    }
  }
}

export default currentSpell
