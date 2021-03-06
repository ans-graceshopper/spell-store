import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({id, handleClick, isLoggedIn, isAdmin}) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/spells">
        <img
          src="/spellbook.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        SpellBinder
      </Link>

      {isLoggedIn ? (
        <ul className="navbar-nav ml-auto">
          {isAdmin ? (
            <li className="nav-item">
              {/* The navbar will show these links after you log in if you are an admin */}
              <Link className="nav-link" to="/admin/orders">
                Admin
              </Link>
            </li>
          ) : (
            ''
          )}
          <li className="nav-item">
            {/* The navbar will show these links after you log in */}
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/account">
              Your Account
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/orders">
              Your Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/spells">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleClick}>
              Logout
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          {/* The navbar will show these links before you log in */}
          <li className="nav-item">
            <Link className="nav-link" to="/spells">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
          </li>
        </ul>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    id: state.user.id,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
