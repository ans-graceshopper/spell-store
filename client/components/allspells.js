import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getAllSpells, getAllElements, me} from '../store'
import SpellList from './spelllist'
import CheckList from './forms/CheckList'

const initialState = {
  magicSchool: '',
  skillLevel: '',
  search: '',
}

class AllSpells extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  componentDidMount() {
    this.props.fetchAllSpells()
    this.props.fetchAllElements()
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  clearFilters = () => {
    this.setState = initialState
  }

  render() {
    const {magicSchool, skillLevel} = this.state
    const {user, elements} = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div>
              {user.isAdmin ? (
                <NavLink to="/spells/add">Add Spell</NavLink>
              ) : (
                ''
              )}
              <form>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <h5 className="my-4">Categories</h5>
                <button onClick={this.clearFilters}>View All</button>
                <p>Magic School</p>
                <select name="magicSchool" onChange={this.handleChange}>
                  <option value="Restoration">Restoration</option>
                  <option value="Destruction">Destruction</option>
                  <option value="Conjuration">Conjuration</option>
                  <option value="Alteration">Alteration</option>
                </select>
                <p>Skill Level</p>
                <select name="skillLevel" onChange={this.handleChange}>
                  <option value="Novice">Novice</option>
                  <option value="Adept">Adept</option>
                  <option value="Expert">Expert</option>
                  <option value="Master">Master</option>
                </select>
                {/* ELEMENTS SELECTOR COULD GO HERE. */}
              </form>
            </div>
          </div>

          <div className="col-lg-9">
            <SpellList
              handleClick={this.handleClick}
              spells={this.props.spells
                .filter(
                  spell =>
                    magicSchool ? spell.magic_school === magicSchool : true
                )
                .filter(
                  spell =>
                    skillLevel ? spell.skill_level === skillLevel : true
                )
                .filter(
                  spell =>
                    this.state.search
                      ? spell.title.toLowerCase().startsWith(this.state.search)
                      : spell
                )}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spells: state.spells,
  user: state.user,
  elements: state.elements,
})

const mapDispatchToProps = dispatch => ({
  fetchAllSpells: () => dispatch(getAllSpells()),
  fetchAllElements: () => dispatch(getAllElements()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSpells)
