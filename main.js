
const button = document.querySelector('.button');

button.addEventListener('click', (e)=>{
    e.preventDefault();

      let nameInput = document.querySelector('.name').value;
      let descriptionInput = document.querySelector('.description').value;

    let objInput = {
        name: nameInput,
        description: descriptionInput,
        completed: false
    }

    axios
    .post(`https://crudcrud.com/api/f5bae6cd687b4692b9c50d509abb019b/todoList`, objInput)
    .then((res) => {
      showOutput(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });


  document.querySelector('.name').value = '';
  document.querySelector('.description').value = '';
})

showOutput = (res)=>
{
   if(res.completed== false){

    document.querySelector('.tasks').innerHTML+=`<div class="${res._id}"> <div class="name-n">&bull; ${res.name}</div> <div class="desc"> ${res.description}</div>
    <button class="complete-btn" data-id="${res._id}">Task Completed</button>
    <button class="delete-btn" data-id="${res._id}">Delete Task</button></div>`
   }
   else {
    document.querySelector('.Completed').innerHTML+=`<div class="${res._id}"> &bull; ${res.name} - ${res.description} : Task Completed
    </div>`
   }

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const taskId = deleteButton.getAttribute('data-id');
      deleteTask(taskId);
    });
  });

  const CompletedButtons = document.querySelectorAll('.complete-btn');
  CompletedButtons.forEach((CompletedButton)=>{
    CompletedButton.addEventListener('click', (event)=>{
        const taskId = CompletedButton.getAttribute('data-id');
        const name=event.target.parentElement.querySelector('div:nth-child(1)').innerText;
        const description=event.target.parentElement.querySelector('div:nth-child(2)').innerText;
        console.log(name);
        deletefromUI(taskId)
        markTaskAsCompleted(taskId, name, description);

        document.querySelector('.Completed').innerHTML+=`<div> &bull; ${name} - ${description} : Task Completed
        </div>`

        
    });
    })
}

getOutput = ()=>
{
    axios
    .get('https://crudcrud.com/api/f5bae6cd687b4692b9c50d509abb019b/todoList')
    .then((res)=>{
        res.data.forEach((task)=>{
        showOutput(task)
    })
    })
    .catch((err)=> console.log(err))

}

getOutput()

deleteTask = (taskId)=>{
    axios
    .delete(`https://crudcrud.com/api/f5bae6cd687b4692b9c50d509abb019b/todoList/${taskId}`)
    .then(()=>{

        const taskToDelete = document.querySelector(`[class="${taskId}"]`)
        taskToDelete.parentElement.removeChild(taskToDelete)

    })
    .catch((err)=>console.log(err))
}

function markTaskAsCompleted(taskId , name, description) {
    
    const updatedTaskData = {
        name: name,
        description: description,
        completed: true
    };
  
    // Send a PUT or PATCH request to update the task's completed status on the server
    axios.put(`https://crudcrud.com/api/f5bae6cd687b4692b9c50d509abb019b/todoList/${taskId}`, updatedTaskData)

      .catch((error) => {
        console.error(error);
      });
  }
  
  deletefromUI = (taskId)=>{
    const taskToDelete = document.querySelector(`[class="${taskId}"]`)
        taskToDelete.parentElement.removeChild(taskToDelete)
  }