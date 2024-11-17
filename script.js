let ex = [];
let exchangeRates = {};

// Function to fetch exchange rates from API
async function fetchExchangeRates() {
    const apiKey = 'fca_live_Nk4zSjbhh2ENptcnhpoOrZ5VnLGqK7fLgODdMODX'; // Your API key
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=EUR,USD,CAD&base_currency=RUB`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        exchangeRates = data.data;
        upUI();
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Function to convert amount to RUB
function ToRUB(amount, currency) {
    if (currency === 'RUB') {
        return amount;
    }
    return amount / exchangeRates[currency];
}

// Updating the list of expenses and the amount
function upUI() {
    // Clear the list
    document.getElementById("category-list").innerHTML = "";

    // Display expenses by category
    const categorySummary = ex.reduce((acc, expense) => {
        const category = expense.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(expense);
        return acc;
    }, {});

    for (const category in categorySummary) {
        const categorySection = document.createElement("div");
        categorySection.className = "category-section";
        categorySection.innerHTML = `
            <h3>${category}</h3>
            <ul>
                <!-- Список расходов -->
            </ul>
        `;

        const categoryList = categorySection.querySelector("ul");
        categorySummary[category].forEach((expense, i) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} <span>${expense.amount} ${expense.currency}</span>
                <button onclick="edit_ex(${i})">Редактировать</button>
                <button onclick="delete_ex(${i})">Удалить</button>
            `;
            categoryList.appendChild(li);
        });

        document.getElementById("category-list").appendChild(categorySection);
    }

    // Update the total amount in RUB
    const totalRUB = ex.reduce((sum, expense) => sum + ToRUB(expense.amount, expense.currency), 0);
    document.getElementById("total").textContent = totalRUB.toFixed(2);
}

// Function to check if the name contains only digits
function isValidName(name) {
    return !/^\d+$/.test(name);
}

// Adding an expense
document.getElementById("expense").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const currency = document.getElementById("expense-currency").value;
    const category = document.getElementById("expense-category").value;

    if (name && amount > 0 && isValidName(name)) {
        ex.push({ name, amount, currency, category });
        upUI();
        document.getElementById("expense").reset();
    } else {
        alert("Пожалуйста, введите корректные данные. Название не должно содержать только цифры.");
    }
});

// Editing the expense
function edit_ex(i) {
    const name = prompt("Введите куда вы потратили:", ex[i].name);
    const amount = parseFloat(prompt("Введите сумму, которую потратили:", ex[i].amount));
    const currency = prompt("Введите валюту (RUB, USD, EUR):", ex[i].currency);
    const category = prompt("Введите категорию (Еда, Транспорт, Развлечения, Другое):", ex[i].category);

    if (name && amount && isValidName(name) && ["RUB", "USD", "EUR"].includes(currency) && ["Еда", "Транспорт", "Развлечения", "Другое"].includes(category)) {
        ex[i] = { name, amount, currency, category };
        upUI();
    } else {
        alert("Пожалуйста, введите корректные данные. Название не должно содержать только цифры.");
    }
}

// Removing the expense
function delete_ex(index) {
    ex.splice(index, 1);
    upUI();
}

// Fetch exchange rates on page load
fetchExchangeRates();
