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
    const userOrders = this.props.userOrders
    if (!userOrders) return <div>no orders.</div>
    return (
      <div>
        <OrderList userOrders={userOrders} />
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
