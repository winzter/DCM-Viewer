import {Component} from "react";
import {Table} from 'antd';
import './Study.css';
import axios from "axios";

class ChartSample extends Component {
    constructor(props){
        super(props);
        this.state = {
            colums : [],
            Data:[]
        }
    }

    Predict(data){
      var num = Math.round((data.filter((data) => {
        return data.PredictionString === "negative 1 0 0 1 1"
      }).length/data.length)*100);

      var num1 = Math.round((data.filter((data) => {
        return data.PredictionString === "none 1 0 0 1 1"
      }).length/data.length)*100);
      
      return (
          <div style={{fontSize:"12px"}}>
              <h3 title="none 1 0 0 1 1">none 1 0 0 1 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{num1}%</h3>
              <h3 title="negative 1 0 0 1 1">negative 1 0 0 1 1 &nbsp;&nbsp;&nbsp;{num}%</h3>
          </div>
      );
    }

    Id(data) {
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
                        title : this.Id(data.length),
                        dataIndex :'id'
                      }
                    ],
                    sorter: {
                      compare: (a,b) => a.id.localeCompare(b.id)
                    }
                  },
                  {
                    title : 'PredictionString',
                    dataIndex : 'PredictionString',
                    children :[
                      {
                        title : this.Predict(data),
                        dataIndex :'PredictionString'
                      }
                    ],
                    sorter: {
                      compare: (a, b) => a.PredictionString.length - b.PredictionString.length
                    }
                  }
                ],
                Data : data
            }
        )
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/csv/sample_submission.csv")
        .then((data)=> {
          this.setData(data.data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    render(){
        return(
                <div className="study" style={{width:"80vw",overflowY:"auto",height:"auto"}}>
                    <Table columns={this.state.columns} 
                           dataSource={this.state.Data}
                           tableLayout="fixed" 
                           sticky={true}
                    />
                </div>
        )
    }
}
export default ChartSample ;