import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllSpells,
  SpellDetail,
  AddSpell,
  EditSpell,
  Cart,
  AllOrders,
} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <div className="main container">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          {/* SPELL ROUTES */}
          <Route exact path="/spells/:id" component={SpellDetail} />
          <Route exact path="/spells" component={AllSpells} />

          {/* CART ROUTES */}
          <Route path="/cart" component={Cart} />

          {/* LOGGED IN USER ROUTES */}
          {isLoggedIn && (
            <Switch>
              <Route path="/home" component={UserHome} />

              {/* ADMIN ROUTES */}
              {isAdmin && (
                <Switch>
                  {/* ORDER MANAGEMENT ROUTES */}
                  <Route path="/admin/orders" component={AllOrders} />

                  {/* SPELL MANAGEMENT ROUTES */}
                  <Route exact path="/spells/add" component={AddSpell} />
                  <Route exact path="/spells/:id/edit" component={EditSpell} />

                  {/* USER MANAGEMENT ROUTES */}
                  {/* <Route exact path="/admin/users/add" component={AddUser} />
                  <Route
                    exact
                    path="/admin/users/:id/edit"
                    component={EditUser}
                  />
                  <Route exact path="/admin/users/:id" component={UserDetail} />
                  <Route path="/admin/users" component={AllUsers} /> */}
                </Switch>
              )}
            </Switch>
          )}

          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
