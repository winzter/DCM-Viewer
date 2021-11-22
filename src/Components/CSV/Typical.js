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

class Typical extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{}
        }
    }

    setData(data){
        var Typical0 = data.filter((e)=>{
            return e[`Typical Appearance`] === "0"
        })
        var Typical1 = data.filter((e)=>{
            return e[`Typical Appearance`] === "1"
        })
        this.setState({
            chartData :{
                labels: ['0','1'],
                datasets: [{
                    label:'Typical Appearance',
                    data: [Typical0.length,Typical1.length],
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
export default Typical;

