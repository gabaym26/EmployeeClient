import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReducerEmployee from './reducers/reducerEmployees'
import ReducerRole from './reducers/reducerRoles'
import { thunk } from 'redux-thunk'

const reducers = combineReducers({
    employee: ReducerEmployee,
    role: ReducerRole,
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;