import React, {Component} from 'react'
import {connect} from 'react-redux'
import OrderList from './user-order-list'
import {getUserOrders} from '../store'

const initialState = {
  user: {},
  orders: [],
  selectedOrder: {},
}

class UserOrders extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {
    console.log('componentDidMount this: ', this)
    console.log(this.props.user.id)
    // trying to retrive a specific users' orders through 'fetch'
    // if they don't exist here
  }
  render() {
    const user = this.props.user
    if (!user) return <div />
    return (
      <div>
        <h3>WELCOME TO THE THUNDERDOME, {user.email}!</h3>
        <OrderList user={user} orders={user.orders} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('user-orders mapState state:', state)
  return {user: state.user, orders: state.user.orders}
}

const mapDispatch = null
export default connect(mapState, mapDispatch)(UserOrders)
