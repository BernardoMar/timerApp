import React, {Component} from 'react';
import NewTask from './NewTask.js';
import ViewTasks from './ViewTasks.js';
import ClosedTasks from './ClosedTasks.js';
import './css/taskTracker.css';
import axios from 'axios';

const SERVER_URL = 'https://quiet-brook-52675.herokuapp.com/tasks';

class TaskTracker extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };

  };


  componentDidMount() {

    const fetchTasks = () => {
      axios(SERVER_URL).then((response) => {

        this.setState({tasks: response.data});
        setTimeout(fetchTasks, 1000);
      });
    };

    fetchTasks();
  };

  render() {
    return (
      <div className="container">
        <NewTask/>
        <div className="tablesContainer">
          <ViewTasks alltasks={this.state.tasks}/>

          <ClosedTasks alltasks={this.state.tasks}/>
        </div>
      </div>
    )
  };
};

export default TaskTracker;
