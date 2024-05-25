// Data for now
const currencies = {
  timestamp: 1519296206,
  base: "EUR",
  text: "Euro",
  date: "2021-03-17",
  rates: {
    USD: { rate: 1.08, text: "US Dollar" },
    GBP: { rate: 0.85, text: "British Pound" },
    EUR: { rate: 1, text: "Euro" },
  },
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
  for (const currency in rates) {
    const rateInfo = rates[currency];
    const newOption = document.createElement("option");
    newOption.value = currency;
    newOption.text = `${currency} - ${rateInfo.text}`;
    select.appendChild(newOption);
  }
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
  const rateFrom = currencies.rates[selectedFromCurrency].rate;
  const rateTo = currencies.rates[selectedToCurrency].rate;

  // Perform the conversion and render it
  const convertedAmount = (inputAmount / rateFrom) * rateTo;
  const convertedAmountString = convertedAmount.toFixed(3);
  const lastDigit = convertedAmountString.slice(-1); // Get the last three digits
  const selectedToCurrencyInfo = currencies.rates[selectedToCurrency];

  amountWanted.innerHTML = `${inputAmount} ${selectedFromCurrency} =`;
  amountResult.innerHTML = `${convertedAmountString.slice(
    0,
    -1
  )}<span class="lastdigit">${lastDigit}</span> ${selectedToCurrencyInfo.text}`;
  ratesNumbers.innerHTML = `1 ${selectedFromCurrency} = ${(
    rateFrom / rateTo
  ).toFixed(4)} ${selectedToCurrency}`;
}

// Add new currency function
function addCurrency(event) {
  event.preventDefault(); // Prevent form submission

  const newRate = parseFloat(getRate.value);
  const newCurrencyCode = getCode.value.toUpperCase();
  const newCurrencyName = getName.value;

  // Add the new currency to the currencies object
  if (!currencies.rates[newCurrencyCode]) {
    currencies.rates[newCurrencyCode] = {
      rate: newRate,
      text: newCurrencyName,
    };
    alert(
      `New currency ${newCurrencyCode} - ${newCurrencyName} added with rate ${newRate}`
    );

    // Add the new currency to all dropdowns
    const currencyDropdowns = document.querySelectorAll(".currency-dropdown");
    currencyDropdowns.forEach((dropdown) => {
      const newOption = document.createElement("option");
      newOption.value = newCurrencyCode;
      newOption.text = `${newCurrencyCode} - ${newCurrencyName}`;
      dropdown.appendChild(newOption);
    });
  } else {
    alert(`Currency code ${newCurrencyCode} already exists.`);
  }
  console.log(currencies); // for check if its added
}

// Update currency function
function updateCurrency(event) {
  event.preventDefault(); // Prevent form submission

  const updatedRate = parseFloat(document.getElementById("update-rate").value);
  const updatedCurrencyCode = document
    .getElementById("to-currency-update")
    .value.toUpperCase();

  // Check if the currency code exists in the currencies object
  if (currencies.rates[updatedCurrencyCode]) {
    // Update the rate of the currency
    currencies.rates[updatedCurrencyCode].rate = updatedRate;

    alert(`Rate for currency ${updatedCurrencyCode} updated to ${updatedRate}`);
  } else {
    alert(`Currency code ${updatedCurrencyCode} does not exist.`);
  }

  console.log(currencies); // for check if its updated
}
function swapCurrencies() {
  const fromCurrency = selectFromElement.value;
  const toCurrency = selectToElement.value;

  selectFromElement.value = toCurrency;
  selectToElement.value = fromCurrency;
}
