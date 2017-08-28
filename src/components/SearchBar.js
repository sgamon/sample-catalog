import React, {Component} from 'react';
import {connect} from 'react-redux'


let mapStateToProps = (state) => {
  return {
    search: state.search,
  }
};


class SearchBar extends Component {
  search(e) {
    this.timer = this.timer || {};
    clearTimeout(this.timer);

    this.interval = this.interval || {};
    clearInterval(this.interval);

    let dispatch = this.props.dispatch.bind(this);

    let updateSearch = () => {
      let search = document.forms.catalogForm.search.value + ' ';
      dispatch({type:'SET', data:{search}});
    };

    this.timer = setTimeout(updateSearch, 500);
    this.interval = setInterval(updateSearch, 1000);

  }

  render() {
    return (
      <div className="search-bar">
        <div className="search-box">
          <i className="fa fa-search"></i>
          <input type="text" name="search" placeholder="Search..." onKeyDown={this.search.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SearchBar);
