import Reducers from './reducers';
import {applyMiddleware, createStore} from 'redux';
import Thunk from 'redux-thunk';

const store = createStore(Reducers, {}, applyMiddleware(Thunk));

export default store;
