import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';


class SelectedRow extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handlePriceChange(e) {
    this.setState({price: e.target.value});
  }

  handleTypeChange(e) {
    this.setState({type: e.target.value});
  }

  handleInventoryChange(e) {
    this.setState({inventory: e.target.value});
  }

  handleSubmit() {
    let scorecard = [];
    if (!this.validateName()) {
      scorecard.push('name is required');
    }
    if (!this.validatePrice()) {
      scorecard.push('price is required, and must be numeric');
    }
    if (!this.validateInventory()) {
      scorecard.push('inventory is required, and must be an integer');
    }

    if (scorecard.length) {
      console.error(scorecard.join('\n'));
      return;
    }

    this.updateAPI();
    this.props.handleSubmit(this.state);
  }

  updateAPI() {
    axios.put(`https://private-anon-d115219a18-weeblyfrontendtrialapi.apiary-mock.com/product/${this.state.id}`, {
        name: this.state.name,
        type: this.state.type,
        price: this.state.price,
        inventory: this.state.inventory
    })
      .then(function (response) {
        console.warn('update accepted');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this.handleSubmit();
  }

  validateName() {
    let name = this.state.name.trim();
    return (!!name.trim().length);
  }

  validatePrice() {
    let price  = this.state.price;
    let isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
    return isNumeric.test(price);
  }

  validateInventory() {
    let inventory  = this.state.inventory;
    let isInteger = /^(\d+)$/;
    return isInteger.test(inventory);
  }

  render() {
    return (
      <tr className="selected">
        <td className="select-item"><i className="fa fa-check-square-o" id={this.props.id} onClick={this.handleSubmit}></i></td>
        <td className="thumbnail"><img src={this.props.thumbnail} alt="" /></td>
        <td className="name"><input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} /></td>
        <td className="type">
          <div className="styled-select">
            <select name="type" value={this.state.type} onChange={this.handleTypeChange}>
              <option>Physical</option>
              <option>Virtual</option>
            </select>
            <i className="fa fa-chevron-down"></i>
          </div>
        </td>
        <td className="price">
          <div className="price-box">
            <i className="fa fa-usd"></i>
            <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} />
          </div>
        </td>
        <td className="inventory"><input type="text" name="inventory" value={this.state.inventory} onChange={this.handleInventoryChange}/></td>
      </tr>
    );
  }
}


export default SelectedRow;

