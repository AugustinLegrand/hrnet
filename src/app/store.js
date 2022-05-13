import { configureStore, applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import EmployeeReducer from '../features/employeeSlice'

const store = createStore(
    combineReducers({
        employees: EmployeeReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store