import React from 'react'
import {connect} from 'react-redux'
import {createSpell} from '../store'
import SpellForm from './spellform'

const blankState = {
  title: '',
  description: '',
  magic_school: '',
  skill_level: '',
  price: 0,
  quantity: 0,
  magickaCost: '',
}

class AddSpell extends React.Component {
  constructor() {
    super()

    this.state = blankState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log(this.state)
    this.props.postSpell(this.state)
    this.setState(blankState)
  }

  render() {
    return (
      <div>
        <h1>ADD A NEW SPELL</h1>
        <SpellForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postSpell: spell => {
      const thunk = createSpell(spell)
      dispatch(thunk)
    },
  }
}

export default connect(null, mapDispatch)(AddSpell)
