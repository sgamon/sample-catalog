import React, {Component} from 'react';
import { connect } from 'react-redux'

import ProductRow from './ProductRow';
import SelectedRow from './SelectedRow';

import searchProducts from '../modules/searchProducts';

let mapStateToProps = (state) => {
  let perPage = state.perPage;
  let onPage = state.onPage;
  let end = perPage * onPage;
  let start = end - perPage;

  let products = searchProducts(state.products, state.search);

  console.log(perPage, onPage);
  console.log(start, end);
  console.log(state.products);

  return {
    products: products.slice(start, end)
  }
};


class ProductsTable extends Component {
  sortAsc(colName) {
    let type = `SORT_BY_${colName}_ASC`;
    this.props.dispatch({type});
  }

  sortDesc(colName) {
    let type = `SORT_BY_${colName}_DESC`;
    this.props.dispatch({type});
  }

  toggleSort(e) {
    let colName = e.target.className.toUpperCase().trim();

    this.sortOrder = this.sortOrder || {};
    this.sortOrder[colName] = !this.sortOrder[colName];

    if (this.sortOrder[colName]) {
      console.log(`sort ${colName} ASC`);
      this.sortAsc(colName);
    } else {
      console.log(`sort ${colName} DESC`);
      this.sortDesc(colName);
    }
  }

  selectHandler(e) {
    let key = e.target.id;
    this.props.dispatch({type:'SELECT', data:{id:key}});
  }

  unselectHandler(e) {
    let key = e.target.id;
    this.props.dispatch({type:'UNSELECT', data:{id:key}});
  }

  toggleSelect() {
    this.selected = !this.selected;

    if (this.selected) {
      this.props.dispatch({type:'SELECT_ALL'});
    } else {
      this.props.dispatch({type:'UNSELECT_ALL'});
    }
  }

  handleSubmit(data) {
    this.props.dispatch({type:'UPDATE', data:data});
  }

  render() {
    return (
      <table width="100%">
        <thead>
        <tr>
          <th className="select-item"><i className="fa fa-square-o" onClick={this.toggleSelect.bind(this)}></i></th>
          <th className="name" colSpan="2" onClick={this.toggleSort.bind(this)}>Name <i className="fa fa-caret-down"></i></th>
          <th className="type" onClick={this.toggleSort.bind(this)}>Type <i className="fa fa-caret-down"></i></th>
          <th className="price" onClick={this.toggleSort.bind(this)}>Price <i className="fa fa-caret-down"></i></th>
          <th className="inventory" onClick={this.toggleSort.bind(this)}>Inventory <i className="fa fa-caret-down"></i></th>
        </tr>
        </thead>
        <tbody>
        {this.props.products.map(item => {
          if (item.selected) {
            return <SelectedRow
              nameId={`name${item.id}`}
              priceId={`price${item.id}`}
              id={item.id}
              key={item.id}
              name={item.name}
              thumbnail={item.thumbnail}
              type={item.type}
              price={item.price}
              inventory={item.inventory}
              selectHandler={this.selectHandler.bind(this)}
              unselectHandler={this.unselectHandler.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
            />
          } else {
            return <ProductRow
              id={item.id}
              key={item.id}
              name={item.name}
              thumbnail={item.thumbnail}
              type={item.type}
              price={item.price}
              inventory={item.inventory}
              selectHandler={this.selectHandler.bind(this)}
              unselectHandler={this.unselectHandler.bind(this)}
            />
          }
        })}

        </tbody>
      </table>
    );
  }

}


export default connect(mapStateToProps)(ProductsTable);
