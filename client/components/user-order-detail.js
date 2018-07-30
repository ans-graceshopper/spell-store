import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderSpells} from '../store'

class OrderDetail extends Component {
  componentDidMount() {
    this.props.fetchOrderSpells(this.props.match.params.id)
  }
  render() {
    if (!this.props.orderSpells) return <div>no spells.</div>
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
          <tbody>
            {this.props.orderSpells.map(spell => {
              return (
                <tr key={spell.id}>
                  <td>{spell.name}</td>
                  <td>{spell.description}</td>
                  <td>{spell.skill_level}</td>
                  <td>{spell.magic_school}</td>
                  <td>quantity goes here</td>
                  <td>spell price goes here</td>
                </tr>
              )
            })}
            <tr>
              <td>TOTAL:</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => ({orderSpells: state.orderSpells})

const mapDispatch = dispatch => ({
  fetchOrderSpells: id => dispatch(getOrderSpells(id)),
})

export default connect(mapState, mapDispatch)(OrderDetail)
