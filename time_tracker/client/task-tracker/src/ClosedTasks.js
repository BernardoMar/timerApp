import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import generatePDF from './reportGenerator';
import './css/closedTask.css'





class ClosedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.alltasks
    }

    this._handleDelete = this._handleDelete.bind(this);
  };



  componentWillReceiveProps(nextProps) {
    if (nextProps.alltasks !== this.state.tasks) {
      this.setState({ tasks: nextProps.alltasks });

    }
  };

  _handleDelete (task) {
    console.log('I will delete this', task);
    axios.delete(`https://quiet-brook-52675.herokuapp.com/tasks/${task._id}`, task._id)
      .then((res) => {
        console.log('not an error', res.data);
      }).catch((error) => {
        console.log('an error', error);
      });
      console.log('Task succesfully deleted');
      alert(`"${task.taskName}" has been deleted!`);
  };

  render() {
    let finishedTasks = this.state.tasks.filter(task => task.finishTime > 0);
    return (
      <div className="closedTaskContainer">
        <div className='c-header'>
          <h2> Closed Tasks </h2>
          <button className="btn-blue" type="submit" onClick={()=>
            { if (window.confirm('Are you sure you want to generate PDF?'))
            generatePDF(finishedTasks)
          }}>
            Generate PDF
          </button>
        </div>
        <div className="closedTable">
          <Table className="c-table" striped bordered hover >
            <thead className="headers">
              <tr>

                <th>Task Name</th>
                <th>Starting time</th>
                <th>Finish time</th>
                <th>Duration</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="rows">

              {
                this.state.tasks.filter( task => task.finishTime > 0)
                .map((task) =>
                <tr key={task._id}>
                  <td className="name-rows">{task.taskName}</td>
                  <td>{task.start}</td>
                  <td>{task.finish}</td>
                  <td>{task.duration}</td>
                  <td className="btn-row">
                    <button  className="btn-red" type="submit" onClick={()=>
                      { if (window.confirm(`Are you sure you want to delete "${task.taskName}?"`))
                      this._handleDelete(task)
                    }}>
                      X
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  };
};

export default ClosedTasks;
