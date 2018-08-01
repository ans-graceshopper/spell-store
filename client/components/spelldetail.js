import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getCurrentSpell} from '../store'

class SpellDetail extends Component {
  componentDidMount() {
    this.props.fetchCurrentSpell(this.props.match.params.id)
  }

  // const {spells, user, match} = props
  // const spellId = match.params.id
  // const spell = spells.find(spl => spl.id === Number(spellId))
  render() {
    const {
      title,
      description,
      images,
      id,
      price,
      magic_school,
      skill_level,
      reviews,
    } = this.props.currentSpell
    // if (reviews.length > 0) {
    //   const avgRating = reviews
    //     .map(review => review.rating)
    //     .reduce((a, b) => (a + b) / reviews.length)
    // }
    if (!this.props.currentSpell.id) return <div>loading...</div>

    return (
      this.props.currentSpell.id && (
        <div className="main container">
          <h1 className="text-center"> Spell Details</h1>
          <div className="card mt-4">
            <img
              className="card-img-top img-fluid img-detail"
              src={images[0]}
            />
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <h4>${price / 100}</h4>
              <p>In stock</p>
              <p className="card-text">{description}</p>
              <p className="card-text">Magic School: {magic_school}</p>
              <p>Skill Level: {skill_level} </p>

              {this.props.user.isAdmin ? (
                <NavLink className="btn btn-danger" to={`/spells/${id}/edit`}>
                  Edit
                </NavLink>
              ) : (
                <button className="btn btn-primary" type="button">
                  Add to Cart (NOT WORKING)
                </button>
              )}
            </div>
          </div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">Reviews</div>
            <div className="card-body">
              {reviews ? (
                <div>
                  <p>RATING stars based on {reviews.length} reviews.</p>

                  <ul className="list-group">
                    {reviews.map(review => {
                      return (
                        <li className="list-group-item" key={review.id}>
                          <h5>{'*'.repeat(+review.rating)}</h5>
                          <h6>{review.rating}</h6>
                          <p>{review.content}</p>
                          <small className="text-muted">Posted by user</small>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <div>No reviews.</div>
              )}
              <hr />
              <a href="#" className="btn btn-success">
                Leave a Review
              </a>
            </div>
          </div>
        </div>
      )
    )
  }
}

const mapState = state => ({
  user: state.user,
  currentSpell: state.currentSpell,
})

const mapDispatch = dispatch => ({
  fetchCurrentSpell: id => dispatch(getCurrentSpell(id)),
})
export default connect(mapState, mapDispatch)(SpellDetail)
