const todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    //Get number of completed todos.

    // for (let i = 0; i < totalTodos; i++) {
    //   if(this.todos[i].completed === true) {
    //     completedTodos++;
    //   }
    // }
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
      completedTodos++;
      }
    });

    // //Case 1: If everything is true, make everything false
    // if (completedTodos === totalTodos) {
    //   //Make everything false
    //   // for (let i = 0; i < totalTodos; i++) {
    //   //   this.todos[i].completed = false;
    //   // }
    //   this.todos.forEach(function(todo) {
    //     todo.completed = false;
    //   });

    //   //Case 2: Otherwise, make everything true
    // } else {
    //   // for (let i = 0; i < totalTodos; i++) {
    //   //   this.todos[i].completed = true;
    //   // }
    //   this.todos.forEach(function(todo) {
    //     todo.completed = true;
    //   });
    // }

    this.todos.forEach(function(todo) {
      //Case 1: If everything is true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      //Case 2: Otherwise, make everything true
      } else {
        todo.completed = true;
      }
    });
  }
};

//Buttons and Actions
const handlers = {
  addTodo: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
    alert("Task done... Great Job!");
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

const view = {
  displayTodos: function() {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = "";
    // for(let i = 0; i < todoList.todos.length; i++) {
    //   let todoLi = document.createElement('li');
    //   let todo = todoList.todos[i];
    //   let todoTextWithCompletion = "";

    //   if (todo.completed === true) {
    //     todoTextWithCompletion = '(x) ' + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = '( ) ' + todo.todoText;
    //   }

    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteButton());
    //   todosUl.appendChild(todoLi);
    // }

    // NOTE:
    // "this" //refers to the view object above
    // forEach(callback, this)

    todoList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    const todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      //Get the element that was clicked
      let elementClicked = event.target;

      //Check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();












