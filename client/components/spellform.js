import React from 'react'

const SpellForm = props => {
  const {handleChange, handleSubmit, state} = props

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Spell Title</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={state.title}
      />

      <label htmlFor="description">Spell Description</label>
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={state.description}
      />

      <label htmlFor="skill_level">Skill Level</label>
      <select
        name="skill_level"
        value={state.skill_level}
        onChange={handleChange}
      >
        <option value="Novice">Novice</option>
        <option value="Adept">Adept</option>
        <option value="Expert">Expert</option>
        <option value="Master">Master</option>
      </select>

      <label htmlFor="magic_school">Magic School</label>
      <select
        name="magic_school"
        value={state.magic_school}
        onChange={handleChange}
      >
        <option value="Restoration">Restoration</option>
        <option value="Destruction">Destruction</option>
        <option value="Conjuration">Conjuration</option>
        <option value="Alteration">Alteration</option>
      </select>

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        onChange={handleChange}
        value={state.price}
      />

      <label htmlFor="magicka_cost">Magicka Cost</label>
      <input
        type="text"
        name="magicka_cost"
        onChange={handleChange}
        value={state.magicka_cost}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default SpellForm
