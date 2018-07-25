import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const Spell = props => {
  const {spell, user} = props
  return (
    <li>
      <p>{spell.title}</p>
      {user.isAdmin ? (
        <NavLink to={`/spells/${spell.id}/edit`}>Edit</NavLink>
      ) : (
        <div />
      )}
    </li>
  )
}

const mapStateToProps = state => ({user: state.user})
export default connect(mapStateToProps)(Spell)
