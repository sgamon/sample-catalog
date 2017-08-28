import React from 'react';


let ProductRow = (props) => {

  return <tr>
    <td className="select-item"><i className="fa fa-square-o" id={props.id} onClick={props.selectHandler.bind(this)}></i></td>
    <td className="thumbnail"><img src={props.thumbnail} alt="" /></td>
    <td className="name">{props.name}</td>
    <td className="type">{props.type}</td>
    <td className="price">${props.price}</td>
    <td className="inventory">{props.inventory}</td>
  </tr>

};


export default ProductRow;
