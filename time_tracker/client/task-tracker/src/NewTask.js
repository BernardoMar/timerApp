import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './css/newTask.css'

class NewTask extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(event) {
    this.setState({taskName: event.target.value});
    };

  _handleSubmit(event) {
    event.preventDefault()
    const time = new Date();
    const startTime = time.getTime();

    const taskObject = {
      "taskName":`${this.state.taskName}`,
      "start":`${time}`,
      "startTime": `${startTime}`
    };

    axios.post('http://localhost:3000/tasks', taskObject)
      .then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
    this.setState({taskName: ''})
    alert(`A task with the name of "${this.state.taskName}" has been created.`);
  };


  render() {
    return (
      <div className="newTaskContainer">
        <Form className="newForm" onSubmit={this._handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h3>Start a new Task</h3></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter task name"
              className="input"
              name="Task Name"
              onChange={this._handleChange}
              value={this.state.taskName} />
            </Form.Group>
          <button className="btn-blue">
            Submit
          </button>
        </Form>
      </div>
    )
  };
};

export default NewTask;
