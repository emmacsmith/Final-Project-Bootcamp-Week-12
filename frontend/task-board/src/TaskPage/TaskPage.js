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
        
    }, [])


    const deleteTask = async (id) => {
        
        let response = await fetch("https://localhost:7152/api/TaskItem/Delete?id=" + id, {
            method: "DELETE",
        });
    }


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

    return (
        <>
        <h2>Individual Task View</h2>

        {JSON.stringify(task)}


        {/*Find individual task button*/}
        {/* <button onClick={() => getOneTask( 1 )} className="FindTask">Find Task</button> */}
        
        {/*Delete individual task button*/}
        <button onClick={() => deleteTask( 1 )} className="deleteTask">Delete Task</button>
        
        {/*Edit individual task button*/}
        /task/:id/edit
        <button onClick={() => navigate("/task/" + id + "/edit")}>  Edit Task </button>
    

        </>
        
    );

}