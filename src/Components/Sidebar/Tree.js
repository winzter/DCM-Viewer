import React, { Component } from 'react';
import TreeMenu from "react-simple-tree-menu";
import '../main.css';
import { withRouter } from "react-router-dom";
import axios  from 'axios';

class Data extends Component {
  constructor(props){
    super(props);
    this.state = {
      Data: {}
    }
  }

   componentDidMount(){
    axios.get("http://localhost:5000/test")
      .then((res) => {
        this.setState({Data: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onClickItem = (keys) => {
    // console.log(keys);
    if(keys.isOpen === false){
      // console.log('Trigger Select', keys,`${keys.path}`);
      this.props.history.push("");
      this.props.history.push(`${keys.path}`);
    }
  };

  render(){
    return (
    <div style={{overflowY:"auto"}}>
      <TreeMenu
          data={this.state.Data}
          hasSearch={true}
          onClickItem={this.onClickItem}
      />
    </div>
    );
  };
};

const Tree = withRouter(Data);
export default Tree ;