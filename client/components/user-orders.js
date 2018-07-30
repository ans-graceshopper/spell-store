import React, {Component} from 'react'
import {connect} from 'react-redux'
import OrderList from './user-order-list'
import {getUserOrders} from '../store'

const initialState = {
  userOrders: [],
}

class UserOrders extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {
    this.props.fetchUserOrders(this.props.user.id)
  }

  render() {
    const orders = this.props.userOrders
    if (!orders) return <div>no orders.</div>
    return (
      <div>
        <OrderList orders={orders} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {user: state.user, userOrders: state.userOrders}
}

const mapDispatch = dispatch => ({
  fetchUserOrders: id => dispatch(getUserOrders(id)),
})

export default connect(mapState, mapDispatch)(UserOrders)
