//this is the view the user will have of all tasks on the homepage 
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import { useNavigate } from "react-router";





export default function Task({id, name, description, dateDue, status}){
    const navigate = useNavigate();


    return (
        <>
        <div class="card" style={{width: "18rem"}}>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
        </div>
            <div class="card-body">
            <p className="card-text">
                {status ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>Completed</span>
                ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>Outstanding</span>
                )}
            </p>
                {/*<p class= "card-text">{Task.status}</p>*/}
                {/*<p class="card-text">{description}</p>*/}


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
