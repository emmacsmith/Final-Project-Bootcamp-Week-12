using Microsoft.EntityFrameworkCore;
using TaskBoardFinalProject.Models;
//this gets my models folder with all my classes inside, imports all classes inside that folder 


namespace TaskBoardFinalProject.Data
{
    public class ApiContext : DbContext 
        //inherits from the database context/ extends database 
        //DbContext is built within the mictosoft entity framework library that I am importing 
    {
        public DbSet<TaskItem> Tasks { get; set; }
        //the models are currently wrapped and I am importing my TaskItem file with the classes into the database
        
        public ApiContext(DbContextOptions<ApiContext> options) :base(options) //class constructor (from library)
        {

        }
    }
}
