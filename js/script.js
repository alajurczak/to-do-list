{
  const welcome = () => {
    console.log("Hello!");
  }
  welcome();


  const tasks = [
    {
      content: "obejrzeć lekcję",
      done: true,
    },
    {
      content: "wykonać zadanie domowe",
      done: false,
    },
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li>
        ${task.content}
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };











  const init = () => {
    render();


  };

  init();

}