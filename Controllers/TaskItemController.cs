using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskBoardFinalProject.Models;
using TaskBoardFinalProject.Data;
using Microsoft.AspNetCore.Http.HttpResults;

//all the routes, logic for getting (reading), (updating) editting, deleting and creating (CRUD)

namespace TaskBoardFinalProject.Controllers

   
{
    //add action to allow all routes 
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly ApiContext _context;

        //constructor 
        public TaskItemController(ApiContext context)
        {
            _context = context;
        }

        //route for creating and editing - same method as both are creating a new task essentially
        //JSON result as wanting to return items in json format, expecting the body to be all these routes 
        //this will create a task item and we expect that to use the format written in the taskItem file (name id etc)
        //TaskItem is the type, (class is a type)
        [HttpPost]
        public JsonResult Create(TaskItem item)
        {
            // we need to create a new item 
                _context.Tasks.Add(item);
            
            

            //save updated database after modifying 
            _context.SaveChanges();

            return new JsonResult(Ok(item));        //returns 200 status, means works successfully 
        }



        [HttpPost]
        public JsonResult Edit(TaskItem item)
        {
  

            //task already exists, so we need to find it 
            var itemInDb = _context.Tasks.Find(item.Id);

            if (itemInDb == null)
            {
                return new JsonResult(NotFound());          //return 404 
            }


            //if task exists, update it with data being passed in

            itemInDb.Name = item.Name;
            itemInDb.Description = item.Description;
            itemInDb.DateDue = item.DateDue;
            itemInDb.Status = item.Status;

            

            _context.Update(itemInDb);

            //save updated database after modifying 
            _context.SaveChanges();

            return new JsonResult(Ok(item));        //returns 200 status, means works successfully 
        }


        //creating an endpoint for getting a specific item/ task. GET 1. still within the controller 
        //get 
        //ID (integer) as a parameter, use this to find the task by id 
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.Tasks.Find(id);

            //if no task within the database has this id, not found status code 404 is returned
            if (result == null)
            {
                return new JsonResult(NotFound());
            }
            //if there is a task with that id, return the specific task
            return new JsonResult(Ok(result));
        }

        //creating an endpoint for deleting a task by id 
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.Tasks.Find(id);

            if (result == null)
            {
                return new JsonResult(NotFound());
            }

            //save changes/ updates to database 
            _context.Tasks.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        //getting all tasks from the database 
        //[HttpGet("/GetAll")] - instead of this, at the top with the controller, to display full route.
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.Tasks.ToList();

            return new JsonResult(Ok(result));
        }
    }
}
