import React, { Component } from 'react'
import {Table} from 'antd';
import 'antd/dist/antd.css';
import './Study.css'
import axios from 'axios';
import Pneumonia from './Pneumonia';
import Typical from './Typical';
import Indeterminate from './Indeterminate';
import Atypical from './Atypical';


class ChartStudy extends Component {
    constructor(props){
        super(props);
        this.state = {
            Data:[],
            columns:[]
        }
    }

    Id(data){
        return (
            <div style={{textAlign:"center"}}>
                <h3 style={{color:"#FEB400"}}><b>{data}</b></h3>
                <h4>unique values</h4>
            </div>
        );
    }

    setData(data){
        console.log(data);
        this.setState(
            {
                columns :[
                    { title : 'id',
                      dataIndex : 'id',
                      children :[
                          {
                            title : this.Id(data.length),
                            dataIndex :'id'
                          }
                        ],
                      sorter: {
                          compare: (a, b) => a.id.localeCompare(b.id)
                        }
                    },
                    {
                        title: '#Negative for Pneumonia',
                        dataIndex : 'Negative for Pneumonia',
                        children :[
                            {
                                title: <Pneumonia/>,
                                dataIndex : 'Negative for Pneumonia'
                            }
                        ],
                        sorter: {
                            compare: (a, b) => a[`Negative for Pneumonia`].localeCompare(b[`Negative for Pneumonia`])
                          }
                    },
                    { title : '#Typical Appearance',
                      dataIndex : 'Typical Appearance',
                      children :[
                          {
                            title : <Typical/>,
                            dataIndex :'Typical Appearance'
                          }
                        ],
                        sorter: {
                            compare: (a, b) => a[`Typical Appearance`].localeCompare(b[`Typical Appearance`])
                          }
                    },
                    { title : '#Indeterminate Appearance',
                      dataIndex : 'Indeterminate Appearance',
                      children :[
                          {
                            title : <Indeterminate/>,
                            dataIndex :'Indeterminate Appearance'
                          }
                        ],
                        sorter: {
                            compare: (a, b) => a[`Indeterminate Appearance`].localeCompare(b[`Indeterminate Appearance`])
                          }
                    },
                    { title : '#Atypical Appearance',
                      dataIndex : 'Atypical Appearance',
                      children :[
                          {
                            title : <Atypical/>,
                            dataIndex :'Atypical Appearance'
                          }
                        ],
                        sorter: {
                            compare: (a, b) => a[`Atypical Appearance`].localeCompare(b[`Atypical Appearance`])
                          }
                    }
                ],
                Data : data
            }
        )
        
    }

    componentDidMount(){
       axios.get("http://localhost:5000/csv/train_study_level.csv")
       .then((e) => {
           this.setData(e.data)
       })
       .catch((error)=>{
        console.log(error)
      })
      }

    render() {
        return (
          <div className="study" style={{width:"80vw",overflowY:"auto"}}>
            <Table columns={this.state.columns} 
                   dataSource={this.state.Data}  
                   sticky={true}
                   tableLayout="fixed" 
            />
          </div>
        )
    }
}
export default ChartStudy;