const button = document.querySelector('.button');
const crudCrudUrl ='https://crudcrud.com/api/3ed914a5997042a9b4bfea7fbc9b15da/todoList';

button.addEventListener('click', async (e) => {
    e.preventDefault();

    let nameInput = document.querySelector('.name').value;
    let descriptionInput = document.querySelector('.description').value;

    const objInput = {
        name: nameInput,
        description: descriptionInput,
        completed: false
    };

    try {
        const res = await axios.post(`${crudCrudUrl}`, objInput);
        showOutput(res.data);
        console.log(res);
    } catch (err) {
        console.error(err);
    }

    document.querySelector('.name').value = '';
    document.querySelector('.description').value = '';
});

showOutput = (res) => {
    if (res.completed == false) {
        document.querySelector('.tasks').innerHTML += `<div class="${res._id}"> <div class="name-n">&bull; ${res.name}</div> <div class="desc"> ${res.description}</div>
        <button class="complete-btn" data-id="${res._id}">Task Completed</button>
        <button class="delete-btn" data-id="${res._id}">Delete Task</button></div>`;
        } else {
        document.querySelector('.Completed').innerHTML += `<div class="${res._id}"> &bull; ${res.name} - ${res.description} : Task Completed
        </div>`;
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach((deleteButton) => {
          deleteButton.addEventListener('click', () => {
              const taskId = deleteButton.getAttribute('data-id');
              deleteTask(taskId);
          });
      });

    const CompletedButtons = document.querySelectorAll('.complete-btn');
      CompletedButtons.forEach((CompletedButton) => {
          CompletedButton.addEventListener('click', async (event) => {
              const taskId = CompletedButton.getAttribute('data-id');
              const name = event.target.parentElement.querySelector('div:nth-child(1)').innerText;
              const description = event.target.parentElement.querySelector('div:nth-child(2)').innerText;
              console.log(name);
              //deletefromUI(taskId);
              await markTaskAsCompleted(taskId, name, description);

              document.querySelector('.Completed').innerHTML += `<div> &bull; ${name} - ${description} : Task Completed
              </div>`;
          });
      });
};

getOutput = async () => {
    try {
        const res = await axios.get(`${crudCrudUrl}`);
        res.data.forEach((task) => {
            showOutput(task);
        });
    } catch (err) {
        console.log(err);
    }
};

getOutput();

const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${crudCrudUrl}/${taskId}`);
        const taskToDelete = document.querySelector(`[class="${taskId}"]`);
        taskToDelete.parentElement.removeChild(taskToDelete);
    } catch (err) {
    console.log(err);
    }
};

const markTaskAsCompleted = async (taskId, name, description) => {
    const updatedTaskData = {
        name: name,
        description: description,
        completed: true
    };

    try {
        await axios.put(`${crudCrudUrl}/${taskId}`, updatedTaskData);
        const taskToDelete = document.querySelector(`[class="${taskId}"]`);
        taskToDelete.parentElement.removeChild(taskToDelete);
    } catch (error) {
    console.error(error);
    }
};

// const deletefromUI = (taskId) => {
//     const taskToDelete = document.querySelector(`[class="${taskId}"]`);
//     taskToDelete.parentElement.removeChild(taskToDelete);
// };
