import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getOrderSpells} from '../store'

class OrderDetail extends Component {
  componentDidMount() {
    this.props.fetchOrderSpells(this.props.match.params.id)
  }
  render() {
    if (!this.props.spells[0] || !this.props.spells[0].spellorders)
      return <div>no spells.</div>
    return (
      <div>
        <h3>Order Details</h3>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Spell</th>
              <th>Description</th>
              <th>Skill Level</th>
              <th>School of Magic</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tfoot className="thead-light">
            <tr>
              <td>
                TOTAL: ${this.props.spells
                  .map(
                    spell =>
                      spell.spellorders.price * spell.spellorders.quantity
                  )
                  .reduce((a, b) => a + b) / 100}
              </td>
            </tr>
          </tfoot>

          <tbody>
            {this.props.spells.map(spell => {
              return (
                <tr key={spell.id}>
                  <td>
                    <NavLink to={`/spells/${spell.id}`}>{spell.title}</NavLink>
                  </td>
                  <td>{spell.description}</td>
                  <td>{spell.skill_level}</td>
                  <td>{spell.magic_school}</td>
                  <td>{spell.spellorders.quantity}</td>
                  <td>${spell.spellorders.price / 100}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => ({
  spells: state.spells,
})

const mapDispatch = dispatch => ({
  fetchOrderSpells: id => dispatch(getOrderSpells(id)),
})

export default connect(mapState, mapDispatch)(OrderDetail)
