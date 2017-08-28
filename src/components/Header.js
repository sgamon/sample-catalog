import React, {Component} from 'react';
import {connect} from 'react-redux'

import PageTitle from './PageTitle';
import Button from './Button';


let mapStateToProps = (state) => {
  return {}
};

class Header extends Component {
  handleAdd() {
    this.props.dispatch({type:'ADD_NEW'});
    this.props.dispatch({type:'SET', data:{onPage:1}});
  }


  render(){
    return (
      <div className="header">
        <PageTitle title="Products"/>
        <div className="buttons">
          <Button text="Export"/>
          <Button text="Import"/>
          <Button text="Add Product" handleClick={this.handleAdd.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header);

