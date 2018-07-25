/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllSpells} from './allspells'
export {default as AddSpell} from './addSpell'
export {default as EditSpell} from './editspell'
export {Login, Signup} from './auth-form'
