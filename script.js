let ex = [];

// Exchange rates (example rates, you can update them as needed)
const exchangeRates = {
    USD: 86, // 1 USD = 90 RUB
    EUR: 100, // 1 EUR = 100 RUB
    RUB: 1 // 1 RUB = 1 RUB
};

// Function to convert amount to RUB
function ToRUB(amount, currency) {
    return amount * exchangeRates[currency];
}

// Updating the list of expenses and the amount
function upUI() {
    // Clear the list
    document.getElementById("expense-list").innerHTML = "";

    // Display expenses
    ex.forEach((ex, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${ex.name} <span>${ex.amount} ${ex.currency}</span>
            <button onclick="edit_ex(${i})">Редактировать</button>
            <button onclick="delete_ex(${i})">Удалить</button>
        `;
        document.getElementById("expense-list").appendChild(li);
    });

    // Update the total amount in RUB
    const totalRUB = ex.reduce((sum, expense) => sum + ToRUB(expense.amount, expense.currency), 0);
    document.getElementById("total").textContent = totalRUB.toFixed(2);
}

// Adding an expense
document.getElementById("expense").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const currency = document.getElementById("expense-currency").value;

    if (name && amount > 0) {
        ex.push({ name, amount, currency });
        upUI();
        document.getElementById("expense").reset();
    } else {
        alert("Пожалуйста, введите корректные данные.");
    }
});

// Editing the expense
function edit_ex(i) {
    const name = prompt("Введите куда вы потратили:", ex[i].name);
    const amount = parseFloat(prompt("Введите сумму, которую потратили:", ex[i].amount));
    const currency = prompt("Введите валюту (RUB, USD, EUR):", ex[i].currency);

    if (name && amount && ["RUB", "USD", "EUR"].includes(currency)) {
        ex[i] = { name, amount, currency };
        upUI();
    } else {
        alert("Пожалуйста, введите корректные данные.");
    }
}

// Removing the expense
function delete_ex(index) {
    ex.splice(index, 1);
    upUI();
}
