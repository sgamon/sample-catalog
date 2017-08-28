import React, { Component } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import logMock from './modules/log-mock';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './store/reducers';
import defaultState from './store/defaultState';
import data from './all-products.json';

// css
import './App.css';

// components
import ContentPanel from './components/ContentPanel';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductsTable from './components/ProductsTable';
import Footer from './components/Footer';


// mock the endpoint
let allProductsEndpoint = 'https://private-anon-d115219a18-weeblyfrontendtrialapi.apiary-mock.com/products';
// let mock = new MockAdapter(axios);

// mock.onGet(allProductsEndpoint).reply(function(config) {
//   logMock(config);
//   return new Promise(function(resolve, reject) {
//     resolve([200, data]);
//   });
// });


let store = createStore(reducers, defaultState);


class App extends Component {

  componentDidMount() {
    axios.get(allProductsEndpoint, {
      params: {
        lat:123,
        long:456
      }
    })
      .then(function (response) {
        let state = Object.assign(store.getState(), {products:response.data});
        store.dispatch({type:'SET', data:state});
        console.log("state:", store.getState());
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ContentPanel content={
            <div>
              <Header/>
              <SearchBar/>
              <ProductsTable/>
              <Footer/>
            </div>
          }/>
        </div>
      </Provider>
    );
  }
}

export default App;
