import React, {Component} from 'react';
import {connect} from 'react-redux'
import _ from 'lodash';

// import './Footer.css';
// import './Button.css';

import IconButton from "./IconButton";

import searchProducts from '../modules/searchProducts';


let getNumPages = (state) => {
  let numPages  = 1;
  let products = searchProducts(state.products, state.search);;
  let len = products.length || 1;
  let perPage = state.perPage;

  if (len < perPage) {
    numPages = 1;
  } else if (!(len % perPage)) {
    numPages = len / perPage;
  } else {
    numPages = Math.floor(len / perPage) + 1;
  }

  return numPages;
};


let mapStateToProps = (state) => {
  return {
    perPage: state.perPage,
    onPage: state.onPage,
    numPages: getNumPages(state)
  }
};


class Footer extends Component {
  updateItemsPerPage(e) {
    let perPage = e.target.value;
    this.props.dispatch({type:'SET', data:{perPage}});
  }

  updateCurrentPage(e) {
    let onPage = e.target.value;
    this.props.dispatch({type:'SET', data:{onPage}});
  }

  nextPage(e) {
    let numPages = this.props.numPages;
    console.log('next');
    this.props.dispatch({type:'INCREMENT', data:{numPages}});
  }

  previousPage(e) {
    let onPage = parseInt(document.forms.catalogForm.page.value, 10);
    console.log('previous');
    this.props.dispatch({type:'DECREMENT'});
  }

  render() {
    return (
      <div className="footer">

        <div className="items-per-page">
          <label>Items per page:</label>
          <div className="styled-select">
            <select name="itemsPerPage" value={this.props.perPage} onChange={this.updateItemsPerPage.bind(this)}>
              {
                [5, 10, 15].map((num,i) => <option key={i} value={num}>{num}</option>)
              }
            </select>
            <i className="fa fa-chevron-down"></i>
          </div>
        </div>

        <div className="buttons">
          <IconButton icon="chevron-left" clickHandler={this.previousPage.bind(this)} />
          <div className="styled-select">
            <select name="page" value={this.props.onPage} onChange={this.updateCurrentPage.bind(this)}>
              {
                _.fill(Array(this.props.numPages), '')
                  .map((el,i) => <option key={i}>{++i}</option>)
              }
            </select>
            <i className="fa fa-chevron-down"></i>
          </div>
          <IconButton icon="chevron-right" clickHandler={this.nextPage.bind(this)} />
        </div>

      </div>
    );
  }

}


export default connect(mapStateToProps)(Footer);
