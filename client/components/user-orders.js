import React, {Component} from 'react'
import {connect} from 'react-redux'
import OrderList from './user-order-list'
import OrderDetail from './user-order-detail'

class UserOrders extends Component {
  constructor() {
    super()
    this.state = {
      selectedOrder: {},
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(order) {
    this.setState({selectedOrder: order})
  }
  render() {
    const {selectedOrder} = this.state
    return (
      <div>
        <h3>WELCOME TO THE THUNDERDOME, {this.props.user.email}!</h3>
        <OrderList
          orders={this.props.user.orders}
          handleClick={this.handleClick}
        />
        {selectedOrder ? (
          <OrderDetail spells={selectedOrder.spells} />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({user: state.user, orders: state.user.orders})
const mapDispatch = null

export default connect(mapState, mapDispatch)(UserOrders)
