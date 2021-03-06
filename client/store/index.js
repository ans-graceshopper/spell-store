import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import spells from './spell'
import currentSpell from './spell-detail'
import cart from './cart'
import orders from './order'
import userOrders from './user-orders'
import currentOrder from './order-detail'
import allOrders from './all-orders'

const reducer = combineReducers({
  user,
  spells,
  cart,
  orders,
  userOrders,
  allOrders,
  currentOrder,
  currentSpell,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './spell'
export * from './spell-detail'
export * from './cart'
export * from './order'
export * from './user-orders'
