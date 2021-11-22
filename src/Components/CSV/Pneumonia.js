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

class Pneumonia extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{}
        }
    }

    setData(data){
        var Pneumonia0 = data.filter((data)=>{
            return data[`Negative for Pneumonia`] === "0"
        })
        var Pneumonia1 = data.filter((data)=>{
            return data[`Negative for Pneumonia`] === "1"
        })
        this.setState({
            chartData :{
                labels: ['0','1'],
                datasets: [{
                    label:'Negative for Pneumonia',
                    data: [Pneumonia0.length,Pneumonia1.length],
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
export default Pneumonia;

