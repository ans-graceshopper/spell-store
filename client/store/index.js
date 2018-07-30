import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import spells, {currentSpellReducer} from './spell'
import cart from './cart'
import orders from './order'
import userOrders from './user-orders'
import orderSpells from './order-spells'

const reducer = combineReducers({
  user,
  spells,
  cart,
  orders,
  userOrders,
  orderSpells,
  currentSpellReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './spell'
export * from './cart'
export * from './order'
export * from './user-orders'
export * from './order-spells'
