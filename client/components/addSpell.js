import React from 'react'
import {connect} from 'react-redux'
import {postSpell} from '../store'

class AddSpell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      magic_school: '',
      skill_level: '',
      price: 0,
      quantity: 0,
      magickaCost: '',
    }

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
    // this.setState(newState) // TODO: I think this should be empty?
  }

  render() {
    return (
      <div>
        <h1>ADD A NEW SPELL</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Spell Title</label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />

          <label htmlFor="description">Spell Description</label>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />

          <label htmlFor="skill_level">Skill Level</label>
          <select
            name="skill_level"
            value={this.state.skill_level}
            onChange={this.handleChange}
          >
            <option value="Novice">Novice</option>
            <option value="Adept">Adept</option>
            <option value="Expert">Expert</option>
            <option value="Master">Master</option>
          </select>

          <label htmlFor="magic_school">Magic School</label>
          <select
            name="magic_school"
            value={this.state.magic_school}
            onChange={this.handleChange}
          >
            <option value="Restoration">Restoration</option>
            <option value="Destruction">Destruction</option>
            <option value="Conjuration">Conjuration</option>
            <option value="Alteration">Alteration</option>
          </select>

          <button type="submit">Add new spell!</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postSpell: spellData => {
      const thunk = postSpell(spellData)
      dispatch(thunk)
    },
  }
}

export default connect(null, mapDispatch)(AddSpell)
