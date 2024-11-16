let ex = [];

// Updating the list of expenses and the amount
function upUI() {
    // Clear the list
    document.getElementById("expense-list").innerHTML = "";

    // Display expenses
    ex.forEach((ex, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${ex.name} <span>${ex.amount} ₽</span>
            <button onclick="edit_ex(${i})">Редактировать</button>
            <button onclick="delete_ex(${i})">Удалить</button>
        `;
        document.getElementById("expense-list").appendChild(li);
    });

    // Update the total amount
    document.getElementById("total").textContent = ex.reduce((sum, expense) => sum + expense.amount, 0);
}

// Adding a flow rateы
document.getElementById("expense").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);

    if (name && amount > 0) {
        ex.push({ name, amount });
        upUI();
        document.getElementById("expense").reset();
    }
});

// Editing the flow rate
function edit_ex(index) {
    const name = prompt("Введите куда вы потратили:", ex[index].name);
    const amount = parseFloat(prompt("Введите сумму которую потратили:", ex[index].amount));

    if (name && amount) {
        ex[index] = { name, amount };
        upUI();
    }
}

// Removing the flow rate
function delete_ex(index) {
    ex.splice(index, 1);
    upUI();
}
