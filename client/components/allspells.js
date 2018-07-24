import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSpells} from '../store'
import SpellList from './spelllist'
import fakeData from '../../server/seed/fakeData'

class AllSpells extends Component {
  constructor() {
    super()
    this.state = {magicSchool: '', skillLevel: ''}
  }
  componentDidMount() {
    this.props.fetchSpells()
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  render() {
    const {magicSchool, skillLevel} = this.state
    return (
      <div>
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
          spells={fakeData.filter(spell => {
            let include = false
            if (this.state.magicSchool) {
              if (spell.magic_school === this.state.magicSchool) {
                include = true
              }
            }
            if (this.state.skillLevel) {
              if (spell.skill_level === this.state.skillLevel) {
                include = include && true
              }
            }
            if (include) return spell
          })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spells: state.spells,
})

const mapDispatchToProps = dispatch => ({
  fetchSpells: () => dispatch(getSpells()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSpells)
