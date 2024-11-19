using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskBoardFinalProject.Models;
using TaskBoardFinalProject.Data;

//all the routes, logic for getting (reading), (updating) editting, deleting and creating (CRUD)

namespace TaskBoardFinalProject.Controllers
{
    [Route("api/[controller]")]
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
        public JsonResult CreateEdit(TaskItem item)
        {
            //if no id- we need to create a new item 
            if (item.Id == 0)
            {
                _context.Tasks.Add(item);
            }
            else
            {   //task already exists, so we need to find it 
                var itemInDb = _context.Tasks.Find(item.Id);

                if (itemInDb == null)
                {
                    return new JsonResult(NotFound());          //return 404 
                }

                //if task exists, update it with data being passed in
                itemInDb = item;
            }

            //save updated database 
            _context.SaveChanges();

            return new JsonResult(Ok(item));        //returns 200 status, means works successfully 
        }
    }
}
