import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getSpells, me} from '../store'
import SpellList from './spelllist'

class AllSpells extends Component {
  constructor() {
    super()
    this.state = {
      magicSchool: '',
      skillLevel: '',
    }
  }
  componentDidMount() {
    this.props.fetchSpells()
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  render() {
    const {magicSchool, skillLevel} = this.state
    const {user} = this.props

    return (
      <div className="container">
        {user.isAdmin ? <NavLink to="/spells/add">Add Spell</NavLink> : ''}

        <form>
          <h4>School of magic</h4>
          <select name="magicSchool" onChange={this.handleChange}>
            <option value="Restoration">Restoration</option>
            <option value="Destruction">Destruction</option>
            <option value="Conjuration">Conjuration</option>
            <option value="Alteration">Alteration</option>
          </select>
          <h4>Skill level</h4>
          <select name="skillLevel" onChange={this.handleChange}>
            <option value="Novice">Novice</option>
            <option value="Adept">Adept</option>
            <option value="Expert">Expert</option>
            <option value="Master">Master</option>
          </select>
        </form>

        <SpellList
          handleClick={this.handleClick}
          spells={this.props.spells
            .filter(
              spell => (magicSchool ? spell.magic_school === magicSchool : true)
            )
            .filter(
              spell => (skillLevel ? spell.skill_level === skillLevel : true)
            )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spells: state.spells,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchSpells: () => dispatch(getSpells()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSpells)
