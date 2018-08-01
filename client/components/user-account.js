import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store'

const initialState = {
  firstName: '',
  lastName: '',
  imageUrl: '',
  email: '',
}

class UserAccount extends Component {
  constructor() {
    super()

    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.user) {
      this.setState({email: this.props.user.email})
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.editTheUser(this.state)
  }

  render() {
    return (
      <UserForm
        user={this.props.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
      />
    )
  }
}

const UserForm = props => {
  const {handleChange, handleSubmit, state} = props
  if (!state) return <div>loading...</div>

  return (
    <div>
      <h3> User Account for {props.user.email}</h3>
      <img
        src="https://storybird.s3.amazonaws.com/artwork/JuliusTan/full/student-spellcaster.jpeg"
        width="500px"
      />
      <h4> Edit Account Details </h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">First Name</label>
        <input type="text" name="firstName" onChange={handleChange} value="" />
        <label htmlFor="email">Last Name</label>
        <input type="text" name="lastName" onChange={handleChange} value="" />

        <label htmlFor="email">Image</label>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          value="https://storybird.s3.amazonaws.com/artwork/JuliusTan/full/student-spellcaster.jpeg"
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

const mapState = state => ({user: state.user})
const mapDispatch = dispatch => {
  return {
    editTheUser: user => {
      const thunk = editUser(user)
      dispatch(thunk)
    },
  }
}

export default connect(mapState, mapDispatch)(UserAccount)
