//forms to create and update individual tasks 
//Here I will:create the form for user to input name, description, due, status
//submit the completed form with filled in data to the API endpoint to allow new task to be created/added to database
//add a message to user to see form is submitted successfully 
//clear the form once form is successfully submitted 

//create and edit call

import {useEffect, useState} from 'react';

export default function CreateTaskForm(){

    //state for form inputs 
    const [task, setTask] = useState({
        id: 0, 
        name:"",
        description:"",
        dateDue:"",
        state:false,
    })

    //state to recieve user inputs 
    const [message, setMessage] = useState("")

    //function to handle form submission 
    //prevents page from refreshing 
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        await createTask();
        //then navigate to home page
    }

    //function to create a new task
    //submit the form to create a new task
    const createTask = async() => {
        let response = await fetch ("https://localhost:7152/api/TaskItem/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })

        let newTask = await response.json();
        setMessage("New Task Added")
        console.log("New Task: ", newTask)
    

        //reset the form after successful creation to allow new task to be created 
        setTask({
            id: 0, 
            name:"", 
            description:"", 
            dateDue:"",
            status: false,
        })
    }


    return (
        <>
        <div className = "container mt-4"></div>
            <h2>Create New Task</h2>
            <div class="alert alert-info">Task successfully created</div>
        <form onSubmit={handleFormSubmission}>


            {/*Task Name Input*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                    Task Name:
                    <input
                        type= "text"
                        value = {task.name}
                        onchange= {(e) => setTask({...task, name: e.target.value})}
                        style= {{ display: "block", width: "100%", padding: "8px" }}
                        required
                    />
                </label>
            </div>

            {/*Task Description Input*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                    Description:
                    {/* use textarea for longer userinputs, supports scolling, for multiline use*/}
                    <textarea
                        value = {task.description}
                        onchange= {(e) => setTask({...task, description: e.target.value})}
                        style= {{ display: "block", width: "100%", padding: "8px" }}
                        required
                    />
                </label>
            </div>


            {/*Task Due Date Input*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                    Due Date:
                    <input
                        type= "date"
                        value = {task.dateDue}
                        onchange= {(e) => setTask({...task, dateDue: e.target.value})}
                        style= {{ display: "block", width: "100%", padding: "8px" }}
                        required
                    />
                </label>
            </div>

            {/*Task status checkbox*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                    Task Completion Status:
                    <input
                        type= "checkbox"
                        checked = {task.status}
                        onchange= {(e) => setTask({...task, status: e.target.value})}
                        style= {{ marginLeft: "10px" }}
                        required
                    />
                </label>
            </div>

            {/* submit form button*/}
            <button 
                type="submit" 
                style= {{ padding:"10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", }}>
                Submit task
            </button>

        </form>
        </>
    );
}