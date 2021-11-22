import './App.css';
import Navbar from './Components/Navbar';
import { Switch, Route } from 'react-router-dom';
import ChartSample from './Components/CSV/ChartSample';
import ChartStudy from './Components/CSV/ChartStudy';
import Sidebar from './Components/Sidebar/Sidebar';
import TableImage from './Components/CSV/TableImage';
import Dcm from './Components/Dcm';
import Home from './Components/Home';
import Contract from './Components/Contract';
//test
function App() {
  return (
    <div>
      <Navbar/>
      <div className="section" style={{display:"flex"}}>
      <Sidebar/>
      <div className="App">
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/contract"  component={Contract}/>
            <Route path="/public/siim-covid19-detection/csv/sample_submission.csv"  component={ChartSample}/>
            <Route path="/public/siim-covid19-detection/csv/train_image_level.csv"  component={TableImage}/>
            <Route path="/public/siim-covid19-detection/csv/train_study_level.csv"  component={ChartStudy}/>
            <Route path="/public/siim-covid19-detection/*" component={Dcm}/>
        </Switch>
        </div>
      </div> 
    </div>
  );
}
export default App;
