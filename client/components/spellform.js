import React from 'react'
import {connect} from 'react-redux'
import {addSpell} from '../store'

class SpellForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '', //etc. will add later
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log(this.state)
    this.props.addSpell(this.state)
    this.setState(newState) // TODO
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Spell Title</label>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.title}
        />

        <button type="submit">Add new spell!</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addSpell: spellData => {
      const thunk = addSpell(spellData)
      dispatch(thunk)
    },
  }
}

export default connect(null, mapDispatch)(SpellForm)
