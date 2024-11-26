import {useEffect, useState} from 'react';
import Task from '../Task/Task';
import { useNavigate } from "react-router";

//this is the homepage itself 

export default function HomePage(){

    //useState is a react hook to fetch data 
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        //get all
        const getTasks = async () => {
            let response = await fetch("https://localhost:7152/api/TaskItem/GetAll");
            let tasks = await response.json();
            setTasks(tasks.value);
        }

        getTasks();
    }, [])

    //create a new task with these parameters 
    //function createTask(id, name, description, dateDue, status){
    const createTask = async (id, name, description, dateDue, status) => {
        
            let response = await fetch("https://localhost:7152/api/TaskItem/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    description: description,
                    dateDue: dateDue,
                    status: status,
                }),  
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            let newTask = await response.json();
            return newTask;
        
        
    };

    //to get task by id 
    const getOneTask = async (id) => {
        let response = await fetch("https://localhost:7152/api/TaskItem/Get?id=" + id);
        let oneTask = await response.json();
        return oneTask;
    }

    

    //const deleteTask = async (id) => {
        
    //    let response = await fetch("https://localhost:7152/api/TaskItem/Delete?id=" + id, {
    //        method: "DELETE"
    //    });

        //if (!response.ok) {
        //    throw new Error(`Error! status: ${response.status}`);
        //}
    //}


    return (
        <>

        {/*<button onClick={() => navigate("/")}> Home</button>*/}

        <button onClick={() => navigate("/create-task")}> Create</button>
        
        {/* button to link to what page it needs to go to to allow creation of task*/}

        {/*<button onClick={() => getOneTask( 1 )} className="FindTask">Find Task</button>*/}

        {tasks.map(task => <Task name={task.name} description={task.description} id={task.id} status={task.status}/>)}

        </>
        
    );
}