//forms to create and update individual tasks 
//Here I will:create the form for user to input name, description, due, status
//submit the completed form with filled in data to the API endpoint to allow new task to be created/added to database
//add a message to user to see form is submitted successfully 
//clear the form once form is successfully submitted 

//create and edit call

import {useEffect, useState} from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router";


export default function EditTaskForm(){
        
        //state for form inputs 
        // const [task, setTask] = useState({
        //     name:"",
        //     description:"",
        //     dateDue:"",
        //     state:false,
        // })

    //takes the specific id from the url 
    const {id} = useParams(); //get the tasks id

    const navigate = useNavigate();
    
    //state for form inputs
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [dateDue, setDateDue] = useState("");
    let [status, setStatus] = useState(false);

    //state to recieve user inputs 
    const [message, setMessage] = useState("")

    useEffect(() => {

 
        //get one, fetch one task by id
        const getOneTask = async () => {
           let response = await fetch("https://localhost:7152/api/TaskItem/Get?id=" + id);
           let oneTask = await response.json();

           //console.log(JSON.stringify(oneTask));
           
           setName(oneTask.value.name);
           setDescription(oneTask.value.description);
           setDateDue(oneTask.value.dateDue);
           setStatus(oneTask.value.status);
           
       }

       getOneTask();
       
   }, [id])


    //handle form input changes 
    //const handleInputChange = (e)  => {
    //    const {name, description, dateDue, status} = e.target
    //    setTask((prevTask) => ({
    //        ...prevTask, 
            
    //    }))
    //}
    



    //function to handle form submission 
    //prevents page from refreshing 
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        let editTask = {
            id,
            name, 
            description, 
            dateDue,
            status,
        }
        console.log(editTask);
        await createTask(editTask);
        //then navigate to home page
    }

    //function to create a new task
    //submit the form to create a new task
    const createTask = async(editTask) => {
        let response = await fetch ("https://localhost:7152/api/TaskItem/Edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editTask),
        });

        let updatedTask = await response.json();
        window.alert("successful Edit!")
        setMessage("Task Updated successfully")
        console.log("Updated Task: ", updatedTask)
    
    }


    return (
        <>

        <button onClick={() => navigate("/")}> Home</button>

        

        <div className = "container mt-4"></div>
            <h2>Edit Task</h2>
            {/*<div class="alert alert-info">Task successfully created</div>*/}
        <form onSubmit={handleFormSubmission}>


            {/*Task Name Input*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                    Task Name:
                    <input
                        type= "text"
                        value = {name}
                        onChange= {(e) => setName(e.target.value)}
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
                        value = {description}
                        onChange= {(e) => setDescription(e.target.value)}
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
                        value = {dateDue}
                        onChange= {(e) => setDateDue(e.target.value)}
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
                        checked = {status}
                        onChange= {(e) => setStatus(e.target.checked)}
                        style= {{ marginLeft: "10px" }}
                        //required
                    />
                </label>
            </div>

            {/* submit form button*/}
            <button 
                type="submit" 
                style= {{ padding:"10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", }}>
                Update task
            </button>

        </form>
        </>
    );
}