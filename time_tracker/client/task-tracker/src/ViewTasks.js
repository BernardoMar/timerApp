import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './css/viewTasks.css'

class ViewTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.alltasks
    }
    this._handleSelect = this._handleSelect.bind(this);
  };

  componentWillReceiveProps(nextProps) {
  if (nextProps.alltasks !== this.state.tasks) {
    this.setState({ tasks: nextProps.alltasks });
  }
}

_handleSelect(task) {
  const finishTime = new Date();
  const stopTime = finishTime.getTime();
  const duration = stopTime - task.startTime;
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  const taskObject = {
    "taskName":`${task.taskName}`,
    "start":`${task.start}`,
    "finish":`${finishTime}`,
    "finishTime":`${stopTime}`,
    "duration":`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
  };


  axios.put(`http://localhost:3000/tasks/${task._id}`, taskObject)
    .then((res) => {
      console.log('not an error', res.data);
    }).catch((error) => {
      console.log('an error', error);
    });
    alert(`${task.taskName}  has been closed.`);
};

  render() {
    return (
      <div className='open-container'>
        <h2> Outstanding Tasks </h2>
        <Table striped bordered hover className="openTable">
          <thead className="headers">
            <tr>

              <th>Task Name</th>

              <th>Finish Task</th>
            </tr>
          </thead>
          <tbody className="openRows">

            {

              this.state.tasks.filter( task => task.finish == null)
              .map((task) =>

              <tr>
                <td className="name-rows">{task.taskName}</td>

                <td className="btn-row">
                  <button className="btn-lime" type="submit"
                    onClick= {()=>
                      {if (window.confirm(`Are you sure you want to finish ${task.taskName}?`))
                      this._handleSelect(task)
                  }} >
                    Finish Task
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  };
};

export default ViewTasks;
