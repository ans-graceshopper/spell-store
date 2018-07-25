import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSpell} from '../store'
import SpellForm from './spellform'

const blankState = {
  title: '',
  description: '',
  magic_school: '',
  skill_level: '',
  price: 0,
  quantity: 0,
  magicka_cost: '',
}

class EditSpell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'loading...',
      description: 'loading...',
      magic_school: 'loading...',
      skill_level: 'loading...',
      price: 0,
      quantity: 0,
      magicka_cost: 'loading...',
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
    this.props.updateTheSpell(this.state)
    this.setState(blankState)
  }

  componentDidMount() {
    const spell = this.props.spells.find(
      spl => spl.id === Number(this.props.match.params.id)
    )

    if (spell) this.setState(spell)
  }

  render() {
    return (
      <div>
        <h1>Edit Spell</h1>
        <SpellForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({spells: state.spells})

const mapDispatchToProps = dispatch => ({
  updateTheSpell: spell => dispatch(updateSpell(spell)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditSpell)
