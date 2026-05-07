let data = JSON.parse(localStorage.getItem("restaurantData")) || [];
const priceInput = document.getElementById("price");
const paidInput = document.getElementById("paid");
const employeesInput = document.getElementById("employees");
const wageInput = document.getElementById("wage");
const addBtn = document.getElementById("addBtn");
const nameInput = document.getElementById("name");
const foodInput = document.getElementById("food");
const employees = [
  { id: 1, name: "An" },
  { id: 2, name: "Binh" },
  { id: 3, name: "Chi" },
];

function save() {
  localStorage.setItem("restaurantData", JSON.stringify(data));
}

function addCustomer() {
  const name = nameInput.value;
  const food = foodInput.value;
  const price = parseFloat(priceInput.value) || 0;
  const paid = parseFloat(paidInput.value) || 0;

  if (!name) return alert("Enter name");

  data.push({ name, food, price, paid });
  save();
  render();

  nameInput.value = "";
  foodInput.value = "";
  priceInput.value = "";
  paidInput.value = "";
}

function deleteCustomer(index) {
  data.splice(index, 1);
  save();
  render();
}

function render() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  let revenue = 0;
  let paidTotal = 0;

  data.forEach((c, i) => {
    revenue += c.price;
    paidTotal += c.paid;

    const row = `
      <tr>
        <td>${c.name}</td>
        <td>${c.food}</td>
        <td>${c.price}</td>
        <td>${c.paid}</td>
        <td><button onclick="deleteCustomer(${i})">X</button></td>
      </tr>
    `;

    tbody.innerHTML += row;
  });

  const employees = parseFloat(employeesInput.value) || 0;
  const wage = parseFloat(wageInput.value) || 0;

  const payroll = employees * wage;
  const profit = paidTotal - payroll;

  document.getElementById("revenue").innerText = revenue;
  document.getElementById("paidTotal").innerText = paidTotal;
  document.getElementById("payroll").innerText = payroll;
  document.getElementById("profit").innerText = profit;
}

addBtn.addEventListener("click", addCustomer);
employeesInput.addEventListener("input", render);
wageInput.addEventListener("input", render);

render();
