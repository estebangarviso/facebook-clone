import notifierReducer from './reducers';
import { legacy_createStore as createStore } from 'redux';

const notifierStore = createStore(notifierReducer);

export default notifierStore;
