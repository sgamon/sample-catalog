import { combineReducers } from 'redux';
import _ from 'lodash';

function products(state = [], action) {
  action.data = action.data || {};
  let products = action.data.products || state;

  switch (action.type) {
    case 'SET':
      state = products.map(product => {
        product.selected = product.selected || false;
        return product;
      });
      break;
    case 'ADD_NEW':
      let maxId = parseInt(_.sortBy(products, 'id').pop().id, 10);
      let nextId = maxId + 1;
      state.unshift({
        id: nextId,
        name: 'New Product',
        type: 'Physical',
        price: '',
        inventory: '',
        selected: true
      });
      break;
    case 'UPDATE':
      state = products.map(product => {
        if (product.id === parseInt(action.data.id, 10)) {
          product.name = action.data.name;
          product.price = parseFloat(action.data.price);
          product.inventory = parseInt(action.data.inventory, 10);
          product.type = action.data.type;
          product.selected = false;
        }
        return product;
      });
      break;
    case 'SELECT':
      console.log(`selecting ${action.data.id}`);
      state  = products.map(product => {
        console.log(`    ${product.id}`);

        if (product.id === parseInt(action.data.id, 10)) {
          console.log(`      matched!`);
          product.selected = true;
        }
        return product;
      });
      break;
    case 'UNSELECT':
      console.log(`unselecting ${action.data.id}`);
      state  = products.map(product => {
        console.log(`    ${product.id}`);

        if (product.id === parseInt(action.data.id, 10)) {
          console.log(`      matched!`);
          product.selected = false;
        }
        return product;
      });
      break;
    case 'SELECT_ALL':
      state = products.map(product => {
        product.selected = true;
        return product;
      });
      break;
    case 'UNSELECT_ALL':
      state = products.map(product => {
        product.selected = false;
        return product;
      });
      break;
    case 'SORT_BY_NAME_ASC':
      state = _.sortBy(state, 'name');
      break;
    case 'SORT_BY_NAME_DESC':
      state = _.sortBy(state, 'name').reverse();
      break;
    case 'SORT_BY_TYPE_ASC':
      state = _.sortBy(state, 'type');
      break;
    case 'SORT_BY_TYPE_DESC':
      state = _.sortBy(state, 'type').reverse();
      break;
    case 'SORT_BY_PRICE_ASC':
      state = _.sortBy(state, 'price');
      break;
    case 'SORT_BY_PRICE_DESC':
      state = _.sortBy(state, 'price').reverse();
      break;
    case 'SORT_BY_INVENTORY_ASC':
      state = _.sortBy(state, 'inventory');
      break;
    case 'SORT_BY_INVENTORY_DESC':
      state = _.sortBy(state, 'inventory').reverse();
      break;
    case 'SET':
      state = action.data.products || state;
      break;
    default:
      break;
  }

  return state;
}

function search(state = {}, action) {
  switch (action.type) {
    case 'SET':
      state = action.data.search;
      break;
    default:
      break;
  }

  return state;
}

function getNumPages(state = {}) {
  let numPages  = 1;
  let products = state.products || [];
  let len = products.length || 1;
  let perPage = state.perPage || 10;

  if (len < perPage) {
    numPages = 1;
  } else if (!(len % perPage)) {
    numPages = len / perPage;
  } else {
    numPages = Math.floor(len / perPage) + 1;
  }

  return numPages;
}

function numPages(state = 1, action = {}) {
  action.data = action.data || {};

  switch (action.type) {
    case 'SET':
      state = getNumPages(action.data);
      break;
    default:
      break;
  }

  return state;
}


function perPage(state = 10, action) {
  switch (action.type) {
    case 'SET':
      state = action.data.perPage || state;
      break;
    default:
      break;
  }

  return state;
}

function search(state = '', action) {
  switch (action.type) {
    case 'SET':
      state = action.data.search || state;
      break;
    default:
      break;
  }

  return state;
}

function onPage(state = 1, action) {
  switch (action.type) {
    case 'SET':
      state = action.data.onPage || state;
      break;
    case 'INCREMENT':
      let nextPage = state + 1;
      if (nextPage <= action.data.numPages) {
        state  = nextPage;
      }
      break;
    case 'DECREMENT':
      let previousPage = state - 1;
      if (previousPage) { // greater than zero
        state = previousPage;
      }
      break;
    default:
      break;
  }

  return state;
}



const App = combineReducers({
  products,
  perPage,
  onPage,
  search,
  numPages
});

export default App;

