namespace TaskBoardFinalProject.Models
    //classes to get mapped to the database table 
    //represents a single row in a database table
    //ie each row in the database will be a task, and each task will have the following: name, id, description etc 
    //in models- set up the structure each task will have, for example- each task will have an id 
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly DateDue { get; set; }
        public bool Status { get; set; }

    }
}
