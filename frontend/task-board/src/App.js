import React from "react";
//import components from the react router library, allows navigation between different components/pages
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage/HomePage';
import CreateTaskForm from './CreateTaskForm/CreateTaskForm'
import TaskPage from './TaskPage/TaskPage'
import EditTaskForm from "./EditTaskForm/EditTaskForm";




export default function App() {
  return (
    <Router>
      {/* manually put the component you are working on in here to see it working */}
      <div>
        {/* navigation links*/}
        <nav>
          <Link to="/">Home</Link>
          {/* navigates to new task create form*/}
          <Link to="/create-task">Create Task</Link>

          {/* navigates to individual task page view, to allow tasks to be edited or deleted*/}
          {/*<Link to="/individual-task">Individual Task View</Link>*/}
        </nav>

        {/*react routes*/}
        <Routes>

          {/*Homepage displaying all tasks*/}
          <Route path= "/" element={<HomePage />}/>
          {/*Explanation: displays all tasks, clicking on one task from homepage will link to specific page using the dynamic route id*/}

          {/*Form to create a new task*/}
          <Route path="/create-task" element={<CreateTaskForm />}/>
          {/*Explanation: opens the new page for users to fill in empty task form*/}

          {/*To individually view each task, to allow editing/ deleting*/}
          {/*This is dynamic (uses task:id) as specifically selects individual task by id to display*/}
          <Route path="/task/:id" element={<TaskPage/>}/>
          {/*Explanation: opens the detailed view of a specific task */}

          <Route path= {"/task/:id/edit"} element={<EditTaskForm />}/>
        </Routes>
      </div>
    </Router>
  );
}

