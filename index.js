// Data for now
const currencies = {
  timestamp: 1519296206,
  base: "EUR",
  text: "Euro",
  date: "2021-03-17",
  rates: [
    { code: "USD", rate: 1.08, text: "US Dollar", updateDate: "12-05-2024" },
    { code: "GBP", rate: 0.85, text: "British Pound", updateDate: "12-05-2024" },
    { code: "EUR", rate: 1, text: "Euro", updateDate: "12-05-2024" },
    { code: "JPY", rate: 170, text: "Japanese Yen", updateDate: "12-05-2024" },
    { code: "INR", rate: 90.44, text: "Indian Rupee", updateDate: "12-05-2024" },
    { code: "CHF", rate: 0.99, text: "Swiss Franc", updateDate: "12-05-2024" },
    { code: "RUB", rate: 97.56, text: "Russian Rubles", updateDate: "12-05-2024" },
    { code: "DKK", rate: 7.46, text: "Danish Krone", updateDate: "12-05-2024" },
    { code: "TRY", rate: 35.03, text: "Turkish Liras", updateDate: "12-05-2024" },
  ],
};

// Elements
const selectToElement = document.getElementById("to-currency");
const selectFromElement = document.getElementById("from-currency");
const amount = document.getElementById("amount");
const ratesNumbers = document.getElementById("rates");
const getName = document.getElementById("new-currency-name");
const getRate = document.getElementById("new-currency-rate");
const getCode = document.getElementById("new-currency-code");

// Add options to the select elements
function addOptions(select, rates) {
  rates.forEach((rateInfo) => {
    const newOption = document.createElement("option");
    newOption.value = rateInfo.code;
    newOption.text = `${rateInfo.code} - ${rateInfo.text}`;
    select.appendChild(newOption);
  });
}

// On load function
document.addEventListener("DOMContentLoaded", () => {
  const currencyDropdowns = document.querySelectorAll(".currency-dropdown");
  currencyDropdowns.forEach((dropdown) => {
    addOptions(dropdown, currencies.rates);
  });
});

// Currency converter
function convertCurrency(event) {
  event.preventDefault();
  // Get the selected currencies and amount
  const selectedFromCurrency = selectFromElement.value;
  const selectedToCurrency = selectToElement.value;
  const inputAmount = parseFloat(amount.value);

  // Get the exchange rates for the selected currencies
  const rateFrom = currencies.rates.find((rate) => rate.code === selectedFromCurrency).rate; //
  const rateTo = currencies.rates.find((rate) => rate.code === selectedToCurrency).rate; //
  console.log(rateTo);
  // Perform the conversion and render it
  const convertedAmount = (inputAmount / rateFrom) * rateTo;
  const convertedAmountString = convertedAmount.toFixed(3);

  const selectedToCurrencyText = currencies.rates.find(
    (rate) => rate.code === selectedToCurrency
  ).text; //
  const lastDigit = convertedAmountString.slice(-1); // Get the last three digits

  amountWanted.innerHTML = `${inputAmount} ${selectedFromCurrency} =`;
  amountResult.innerHTML = `${convertedAmountString.slice(
    0,
    -1
  )}<span class="lastdigit">${lastDigit}</span> ${selectedToCurrencyText}`;
  ratesNumbers.innerHTML = `1 ${selectedFromCurrency} = ${(rateTo / rateFrom).toFixed(
    4
  )} ${selectedToCurrency}`;
}

function addCurrency(event) {
  event.preventDefault(); // Prevent form submission

  const newRate = parseFloat(getRate.value);
  const newCurrencyCode = getCode.value.toUpperCase();
  const newCurrencyName = getName.value;

  // Check if the currency code already exists
  const currencyExists = currencies.rates.some((rate) => rate.code === newCurrencyCode);

  if (!currencyExists) {
    currencies.rates.push({ code: newCurrencyCode, rate: newRate, text: newCurrencyName });

    // Add the new currency to all dropdowns
    const currencyDropdowns = document.querySelectorAll(".currency-dropdown");
    currencyDropdowns.forEach((dropdown) => {
      const newOption = document.createElement("option");
      newOption.value = newCurrencyCode;
      newOption.text = `${newCurrencyCode} - ${newCurrencyName}`;
      dropdown.appendChild(newOption);
    });

    alert(`New currency ${newCurrencyCode} - ${newCurrencyName} added with rate ${newRate}`);
  } else {
    alert(`Currency code ${newCurrencyCode} already exists.`);
  }

  console.log(currencies); // for check if it's added
}

// Update currency function
function updateCurrency(event) {
  event.preventDefault(); // Prevent form submission

  const updatedRate = parseFloat(document.getElementById("update-rate").value);
  const updatedCurrencyCode = document.getElementById("to-currency-update").value.toUpperCase();

  // Find the currency to update
  const currencyToUpdate = currencies.rates.find((rate) => rate.code === updatedCurrencyCode);

  if (currencyToUpdate) {
    currencyToUpdate.rate = updatedRate;
    alert(`Rate for currency ${updatedCurrencyCode} updated to ${updatedRate}`);
  } else {
    alert(`Currency code ${updatedCurrencyCode} does not exist.`);
  }

  console.log(currencies); // for check if it's updated
}

function swapCurrencies() {
  const fromCurrency = selectFromElement.value;
  const toCurrency = selectToElement.value;

  selectFromElement.value = toCurrency;
  selectToElement.value = fromCurrency;
}

// Grid creation for list
const gridList = document.getElementById("gridList");

currencies.rates.forEach((rate) => {
  const newGrid = document.createElement("div");
  newGrid.classList.add("grid-item");
  newGrid.textContent = `${rate.code} - ${rate.text} - Rate = ${rate.rate}`;
  gridList.appendChild(newGrid);
});
//
function findCurrencyRate(searchQuery) {
  const query = searchQuery.trim().toUpperCase();

  const foundRate = currencies.rates.find((rate) => {
    return rate.code.toUpperCase().includes(query) || rate.text.toUpperCase().includes(query);
  });

  const searchResult = document.getElementById("searchResult");

  if (foundRate) {
    searchResult.innerHTML = `Rate for ${foundRate.text} (${foundRate.code}): ${foundRate.rate}`;
  } else {
    searchResult.innerHTML = `Currency rate for ${searchQuery} not found.`;
  }
}
