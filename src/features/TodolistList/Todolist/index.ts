import {asyncAction, slice} from './todolists-reducer'

const todolistsReducer = slice.reducer
const todolistActions = {
  ...asyncAction,
  ...slice.actions
}
export {
  todolistsReducer,
  todolistActions
}