import React from 'react'
import {connect} from 'react-redux'

/* COMPONENT */

export const UserHome = props => {
  const {user} = props
  return (
    <div>
      <h3>Welcome, {user.email}!!!!!!</h3>
    </div>
  )
}

/* CONTAINER */
const mapState = state => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(UserHome)
