const addButton = document.querySelector("button");
const taskList = document.querySelector(".tasks");
const input = document.querySelector("input");

const saveTask = () => {
  const task = document.querySelectorAll(".tasks li");
  const data = [];
  task.forEach((task) => {
    data.push(task.innerText);
  });
  // console.log(data);
  localStorage.setItem("tasks", JSON.stringify(data));
};

const addNewTask = function (task = "") {
  const newTask = document.createElement("li");
  newTask.innerHTML = `
    <div class="left">
        <i class="ri-checkbox-blank-circle-line done"></i>
        <span id="text">${task}</span>
    </div>
    <div class="right"><i class="ri-close-fill"></i></div>
    `;
  newTask.querySelector(".right").addEventListener("click", function () {
    newTask.remove();
    saveTask();
  });

  const checkbox = newTask.querySelector(".done");
  const text = newTask.querySelector("#text");
  newTask.querySelector(".left").addEventListener("click", function () {
    checkbox.classList.toggle("ri-checkbox-circle-fill");
    saveTask();
    text.classList.toggle("checked");
    saveTask();
    checkbox.classList.toggle("ri-checkbox-blank-circle-line");
    saveTask();
  });

  taskList.appendChild(newTask);
  saveTask();
};

addButton.addEventListener("click", function () {
  if (input.value) {
    addNewTask(input.value);
    saveTask();
    input.value = "";
  } else {
    alert("Write something...");
  }
});

(function () {
  const lsTasks = JSON.parse(localStorage.getItem("tasks"));
  lsTasks.forEach((lsTask) => {
    addNewTask(lsTask);
  });
})();
