import axios from "axios";
import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';

const Option = {
    plugins:{
      legend: {
        display: false
      }
  }
}

class Indeterminate extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{}
        }
    }

    setData(data){
        var Indeterminate0 = data.filter((data)=>{
            return data[`Indeterminate Appearance`] === "0"
        })
        var Indeterminate1 = data.filter((data)=>{
            return data[`Indeterminate Appearance`] === "1"
        })
        this.setState({
            chartData :{
                labels: ['0','1'],
                datasets: [{
                    label:'Indeterminate Appearance',
                    data: [Indeterminate0.length,Indeterminate1.length],
                    backgroundColor:[
                        '#FEB400',
                        '#FEB400']
                }]
            }
        })
       
    }

    componentDidMount(){
        axios.get("http://localhost:5000/csv/train_study_level.csv")
        .then((e)=>{
            this.setData(e.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        return(
            <div>
                <Bar data={this.state.chartData} options={Option}/>
            </div>
        )
    }
}
export default Indeterminate;

