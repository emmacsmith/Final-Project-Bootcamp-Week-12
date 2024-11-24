//this is the view the user will have of all tasks on the homepage 
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import { useNavigate } from "react-router";





export default function Task({id, name, description}){
    const navigate = useNavigate();


    return (
        <>
        <div class="card" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{description}</p>

                {/* TODO make this button a react router nav link */}
                {/*<a href="#" class="btn btn-primary">View Task</a>*/}
                {/* <Link to= {"/task" + task.id}> 
                    <button className = "btn btn-primary"> <p>View Task</p></button>
                </Link> */}
                <button onClick={() => navigate ("/task/" + id)}> View Task </button>
            </div>
        </div>
        </>
        );
}
