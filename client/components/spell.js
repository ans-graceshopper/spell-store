import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {addToCart} from '../store'

// const Spell = props => {
class Spell extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addSpellToCart(this.props.spell, this.state.quantity)
  }

  render() {
    const {spell, user} = this.props
    return (
      <div className="card">
        <img className="card-img-top" src={spell.images[0]} />
        <div className="card-body">
          <h5 className="card-title">
            <NavLink to={`/spells/${spell.id}`}>{spell.title}</NavLink>
          </h5>
          <p>${spell.price}</p>
          {user.isAdmin ? (
            <NavLink className="btn btn-danger" to={`/spells/${spell.id}/edit`}>
              Edit
            </NavLink>
          ) : (
            <div />
          )}
        </div>
        <div className="card-footer">
          <form onSubmit={this.handleSubmit}>
            <button className="btn btn-primary" type="submit">
              Add to Cart
            </button>
            <select
              onChange={this.handleChange}
              name="quantity"
              value={this.state.quantity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user, spells: state.spells})

const mapDispatchToProps = dispatch => ({
  addSpellToCart: (spell, quantity) => dispatch(addToCart(spell, quantity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Spell)
