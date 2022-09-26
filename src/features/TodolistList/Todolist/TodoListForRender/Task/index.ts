import { slice, asyncActions } from './tasks-reducer'

const tasksReducer = slice.reducer
const tasksAction = {
  ...asyncActions,
  ...slice.actions
}
export {
  tasksReducer,
  tasksAction
}
