//individual task page, what you want displayed ie edit and delete 
import { useNavigate } from "react-router";

//get by id
//delete call


//individual task component
//specify what you want displayed by each task when clicked on/ inspected 
import {useEffect, useState} from 'react';
import { useParams } from "react-router";

export default function TaskPage(){
    
    //useState is a react hook to fetch data 
    //state to hold the current task- which is option, this is why it accepts null
    const [task, setTask] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
 
         //get one, fetch one task by id
         const getOneTask = async () => {
            let response = await fetch("https://localhost:7152/api/TaskItem/Get?id=" + id);
            let oneTask = await response.json();
            
            setTask(oneTask);
            
        }
 
        getOneTask();
        
    }, [id])


    //const deleteTask = async (id) => {
        
    //    let response = await fetch("https://localhost:7152/api/TaskItem/Delete?id=" + id, {
    //        method: "DELETE",
    //    });
    //}

    //Delete task functionality with user confirmation and return to homepage 
    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) {
            return;
        }

        setIsDeleting(true);

        try {
            let response = await fetch("https://localhost:7152/api/TaskItem/Delete?id=" + id, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Task successfully deleted");
                navigate("/");
            } else {
                alert("Failed to delete the task. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting the task:", error);
            alert("An error occurred while deleting the task.");
        } finally {
            setIsDeleting(false);
        }
    };


     //to edit one task by id 
    const editTask = async (id, updatedTask) => {
        let response = await fetch("https://localhost:7152/api/TaskItem/Edit" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });
        let editedTask = await response.json();
        return editedTask;
    }
    console.log(task,'task');
    

    return (
        <>

        <button className="button is-dark" onClick={() => navigate("/")}> Home</button>


        <h2>Individual Task View</h2>
        {/* no boxes around these sections to show user that in current form, cannot be edited */}
        {/* question mark is used to make check happen before filling in the data, check info recieving from task */}

        {/* {JSON.stringify(task)} */}

        {/*Task Name Input*/}
        <div style= {{ marginBottom: "10px" }}>
                <label>
                    <strong style={{ color: "black" }}>Task Name:</strong>
                    {/* <input
                        type= "text"
                        value = {task?.value.name}
                        onchange= {(e) => setTask({...task, name: e.target.value})}
                        style= {{ display: "block", width: "100%", padding: "8px" }}
                        required
                    /> */}
                    <p>
                    {task?.value.name}
                    </p>
                </label>
            </div>

            {/*Task Description Input*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                <strong style={{ color: "black" }}>Description:</strong>
                    {/* use textarea for longer userinputs, supports scolling, for multiline use*/}
                    {/* <textarea
                        // value = {task.description}
                        onchange= {(e) => setTask({...task, description: e.target.value})}
                        style= {{ display: "block", width: "100%", padding: "8px" }}
                        required
                    /> */}
                </label>
                <p>{task?.value.description}</p>
            </div>


            {/*Task Due Date Input*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                <strong style={{ color: "black" }}>Due Date:</strong>
                    {/* <input
                        type= "date"
                        // value = {task.dateDue}
                        onchange= {(e) => setTask({...task, dateDue: e.target.value})}
                        style= {{ display: "block", width: "100%", padding: "8px" }}
                        required
                    /> */}
                </label>
                <p>{task?.value.dateDue}</p>
            </div>

            {/*Task status checkbox*/}
            <div style= {{ marginBottom: "10px" }}>
                <label>
                <strong style={{ color: "black" }}>Task Completion Status:</strong>
                    {/* <input
                        type= "checkbox"
                        // checked = {task.status}
                        onchange= {(e) => setTask({...task, status: e.target.value})}
                        style= {{ marginLeft: "10px" }}
                        required
                    /> */}
                </label>
                <p>{task?.value.status ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>Task is completed</span>
                ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>Outstanding</span>
                )}
                </p>
            </div>

        {/*Find individual task button*/}
        {/* <button onClick={() => getOneTask( 1 )} className="FindTask">Find Task</button> */}
        
        {/*Delete individual task button*/}
        <div className="box" style={{ padding: "20px" }}>
        <button onClick={() => deleteTask(id)} className="deleteTask button is-danger" disabled={isDeleting}  
            style={{ border: "2px solid black", borderRadius: "5px", padding: "10px" }}
            > 
            {isDeleting ? "Deleting" : "Delete Task"}
            </button>
        
        {/*Edit individual task button*/}
        <button onClick={() => navigate("/task/" + id + "/edit")}
             className="button is-primary" style={{ marginLeft: "10px" }} >  Edit Task </button>
        </div>
    

        </>
        
    );

}