import React from 'react';
// import './ContentPanel.css';


let ContentPanel = (props) => {
  return <div className="content-panel">
    <form name="catalogForm" onSubmit={e => e.preventDefault()}>
      {props.content}
    </form>
  </div>

    };


export default ContentPanel;
