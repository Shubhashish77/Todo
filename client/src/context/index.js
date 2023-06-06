import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
const MyContext = React.createContext();
class MyProvider extends Component {
  state = {
    user: {},
    todo: []
  };
  handleSubmit = (task) => {
    if(task.length<4)
    {
      toast.error("Note must be at least 8 characters", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } else {
      this.setState((prevState) => ({
        todo: [...prevState.todo, {task,subTask:[]}],
      }));
    }
  }
  handleTaskDel = (task) => {
    let newTodo = this.state.todo;
    newTodo = newTodo.filter(item => item.task!==task )
    this.setState({todo: newTodo});
  }
  handleSubtask = ({task}, subTask) => {
    if (subTask.length < 4) {
      toast.error("Subtask must be at least 8 characters", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } else {
      let newSubTask = this.state.todo;
      newSubTask = newSubTask.map((item) => {
        if(item.task===task)
          item.subTask.push(subTask);
        return item;
      });
      this.setState({
        todo: newSubTask
      })

  
      // this.setState((prevState) => ({
      //   //todo: [...prevState.todo, { task, subTask: [] }],
      //   todo: [...prevState.todo, prevState.todo.map(item => item.task === task ? { ...item, subTask: [...prevState.todo.subTask,subTask]}: item)]
      // }));
    }
  }
   
  handleLoginClick = async (data) => {
      try {
        console.log(data);
        const response = await axios.post(`http://localhost:4000/api/v1/users/login`, data);
        this.setState({
          user: response.data.data.user
        });
        if(response.data.status==="success"){
          toast.success("Logged In Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }
      } catch(e){
        toast.error("Please Try Again", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
      
  }
  
  handleRegisterClick = async (data) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/users/signup`, data);
      console.log(response.data.data.user);
      this.setState({ user: response.data.data.user })
      if (response.data.status === "success") {
        toast.success("Registered Successfully Navigating to main page", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (e) {
      toast.error("Please Try Again", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  }

  handleLogout = () => {
    this.state({user: {}});
  }

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            handleSubmit: this.handleSubmit,
            handleSubtask: this.handleSubtask,
            handleLoginClick: this.handleLoginClick,
            handleRegisterClick: this.handleRegisterClick,
            handleLogout: this.handleLogout,
            handleTaskDel: this.handleTaskDel
          }}
        >
          {this.props.children}
        </MyContext.Provider>
        <ToastContainer/>
      </>
    );
  }
}

export { MyContext, MyProvider };
