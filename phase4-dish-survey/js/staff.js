let employees = [];
let tasks = [];

const empName = document.getElementById("empName");
const role = document.getElementById("role");
const assignTo = document.getElementById("assignTo");
const taskInput = document.getElementById("taskInput");
const employeeList = document.getElementById("employeeList");
const taskList = document.getElementById("taskList");

const addEmpBtn = document.getElementById("addEmpBtn");
const assignBtn = document.getElementById("assignBtn");

function addEmployee() {
  const name = empName.value;
  if (!name) return alert("Enter name");

  employees.push({ name, role: role.value });
  renderEmployees();

  empName.value = "";
}

function removeEmployee(index) {
  const removed = employees[index].name;
  employees.splice(index, 1);
  tasks = tasks.filter(t => t.assigned !== removed);

  renderEmployees();
  renderTasks();
}

function assignTask() {
  const person = assignTo.value;
  const task = taskInput.value;

  if (!task) return alert("Enter task");

  tasks.push({ assigned: person, task });
  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((t, i) => {
    taskList.innerHTML += `
      <li>
        <div>
          <strong>${t.assigned}</strong>
          <div class="task">${t.task}</div>
        </div>
        <button onclick="removeTask(${i})">X</button>
      </li>
    `;
  });
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addEmpBtn.addEventListener("click", addEmployee);
assignBtn.addEventListener("click", assignTask);

function renderEmployees() {
  employeeList.innerHTML = "";
  assignTo.innerHTML = "";

  employees.forEach((emp, i) => {
    employeeList.innerHTML += `
      <li>
        ${emp.name} <span class="badge">${emp.role}</span>
        <button onclick="removeEmployee(${i})">X</button>
      </li>
    `;

    assignTo.innerHTML += `<option value="${emp.name}">${emp.name}</option>`;
  });
}

renderEmployees();
