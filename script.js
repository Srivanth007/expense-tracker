let data = {};
let currentUser = "";
let currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

document.getElementById("currentMonth").innerText = currentMonth;

function handleCredentialResponse(response) {
    // You will decode ID token here and get user email
    currentUser = "demo_user"; // Replace this with actual email from token
    document.getElementById("app").style.display = "block";
    loadData();
}

function setSalary() {
    const salary = parseFloat(document.getElementById('salaryInput').value);
    if (!data[currentMonth]) data[currentMonth] = { salary: 0, expenses: [] };
    data[currentMonth].salary = salary;
    updateUI();
    saveData();
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    if (!name || isNaN(amount)) return;
    if (!data[currentMonth]) data[currentMonth] = { salary: 0, expenses: [] };
    data[currentMonth].expenses.push({ name, amount });
    updateUI();
    saveData();
}

function updateUI() {
    const monthData = data[currentMonth] || { salary: 0, expenses: [] };
    const totalExpenses = monthData.expenses.reduce((sum, item) => sum + item.amount, 0);
    document.getElementById('salaryDisplay').innerText = monthData.salary.toFixed(2);
    document.getElementById('expenseDisplay').innerText = totalExpenses.toFixed(2);
    document.getElementById('balanceDisplay').innerText = (monthData.salary - totalExpenses).toFixed(2);
}

async function loadData() {
    const res = await fetch('/api/drive_read');
    data = await res.json();
    updateUI();
}

async function saveData() {
    await fetch('/api/drive_write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
