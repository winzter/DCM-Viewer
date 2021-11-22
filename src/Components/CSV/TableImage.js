import React, { Component } from 'react';
import {Table} from 'antd';
import 'antd/dist/antd.css';
import './Study.css';
import axios from 'axios';

class TableImage extends Component {
    constructor(props){
        super(props);
        this.state={
            Data:[],
            columns:[]
        }
    }

    Label() {
        return (
            <div style={{fontSize:"10px"}}>
                <h3>none 1 0 0 1 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;32%</h3>
                <h3 title=
                "opacity 1 789.28836 582.43035 1815.94498 2499.73327 opacity 1 2245.91208 591.20528 3340.5737 2352.75472">
                opacity 1 789.2883.... &nbsp;&nbsp;0%</h3>
                <h3 style={{"color":"lightgray"}}>Other (4293) &nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;68%</h3>
            </div>
        );
    }

    IdStudyUID() {
        return (
            <div style={{textAlign:"center"}}>
                <h3 style={{color:"#FEB400"}}><b>6054</b></h3>
                <h4>unique values</h4>
            </div>
        );
    }

    Boxes() {
        return (
            <div style={{fontSize:"10px"}}>
                <h3 style={{"color":"red"}}>[null] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;32%</h3>
                <h3 title=
                "[{'x': 789.28836, 'y': 582.43035, 'width': 1026.65662, 'height': 1917.30292}, {'x': 2245.91208, 'y': 591.20528, 'width': 1094.66162, 'height': 1761.54944}]">
                    'x': 789.28836, 'y': .... &nbsp;&nbsp;&nbsp;0%</h3>
                <h3 style={{"color":"lightgray"}}>Other (4293) &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;68%</h3>
            </div>
        );
    }

    IdImage(data) {
        return (
            <div style={{textAlign:"center"}}>
                <h3 style={{color:"#FEB400"}}><b>{data}</b></h3>
                <h4>unique values</h4>
            </div>
        );
    }

    setData(data){
        this.setState({
                columns :[
                  { title : 'id',
                    dataIndex : 'id',
                    children :[
                        {
                          title : this.IdImage(data.length),
                          dataIndex :'id'
                        }
                      ],
                    sorter: {
                        compare: (a, b) => a.id.localeCompare(b.id)
                      }
                  },
                  {
                    title : 'boxes',
                    dataIndex : 'boxes',
                    children :[
                        {
                          title : this.Boxes(),
                          dataIndex :'boxes'
                        }
                      ],
                    sorter: {
                        compare: (a, b) => a.boxes.localeCompare(b.boxes)
                      }
                  },
                  {
                    title : 'label',
                    dataIndex : 'label',
                    children :[
                        {
                          title : this.Label(),
                          dataIndex :'label'
                        }
                      ],
                    sorter: {
                        compare: (a, b) => a.label.localeCompare(b.label)
                      }
                  },
                  {
                    title : 'StudyInstanceUID',
                    dataIndex : 'StudyInstanceUID',
                    children :[
                        {
                          title : this.IdStudyUID(),
                          dataIndex :'StudyInstanceUID'
                        }
                      ],
                    sorter: {
                        compare: (a, b) => a.StudyInstanceUID.localeCompare(b.StudyInstanceUID)
                      }
                  }
                ],
                Data : data
            }
        )
    }

    componentDidMount(){
        axios.get("http://localhost:5000/csv/train_image_level.csv")
        .then((data)=>{
            this.setData(data.data)
        })
      }

    render() {
        return (
            <div className="study" style={{width:"80vw",overflowY:"auto"}}>
                <Table columns={this.state.columns} 
                       dataSource={this.state.Data} 
                       tableLayout="fixed" 
                       sticky={true}
                />
            </div>
        )
    }
}
export default TableImage;