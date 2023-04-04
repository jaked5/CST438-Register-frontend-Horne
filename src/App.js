import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddStudent from '.components/AddStudent'

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Course Registration
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
          <Switch>
              <Route exact path ='/'>
                  <AddStudentButton />
                  <Semester />
              </Route>
              <Route path='/schedule' component={SchedList} />
              <Route path='/addStudent' component={AddStudentPage} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;