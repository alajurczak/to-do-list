{
  const welcome = () => {
    console.log("Hello!");
  }

  let tasks = [];
  let hiddenDoneTask = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks,
    { content: newTaskContent }
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1)
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done},
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const hideDoneTask = () => {
    hiddenDoneTask = !hiddenDoneTask;
    render();
  }

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  }

  const bindButtonsEvents = () => {
    const hiddenTaskButton = document.querySelector(".js-hideDoneTask");

    if (hiddenTaskButton) {
      hiddenTaskButton.addEventListener("click", () => {
        hideDoneTask();
      })
    }
  }


  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="list ${task.done && hiddenDoneTask ? "list__item--hidden" : ""}">
        <button class="list__button list__button--done js-done">${task.done ? "✓" : ""}</button>
        <p class=" ${task.done ? "list__item--done" : "list__item"}">${task.content}</p>
        <button class="list__button list__button--remove js-remove">🗑</button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const renderButtons = () => {
    let renderedButtons = "";

    if (tasks.length > 0) {
      renderedButtons += `
      <button class="js-hideDoneTask">${hiddenDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
      <button class="js-allDone">Ukończ wszystkie</button>
      `;
    }

    document.querySelector(".js-buttons").innerHTML = renderedButtons;

    bindButtonsEvents();
  };


  const render = () => {
    renderTasks();
    renderButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask");
    const newTaskObject = newTaskContent.value.trim();

    if (newTaskObject !== "") {
      addNewTask(newTaskObject);
      newTaskContent.value = "";
    }
    newTaskContent.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);

    welcome();
  };

  init();

}