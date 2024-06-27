async function getData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/FurkannOzbek/FurkannOzbek.github.io/main/currencies.json"
  );
  const myData = await response.json();
  console.log(JSON.stringify(response));
  let alertCurrencies = [];

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
  // Function to update the currency symbol
  function updateCurrencySymbol() {
    const selectedFromCurrency = selectFromElement.value;
    const fromCurrencyData = myData.rates.find((rate) => rate.code === selectedFromCurrency);
    if (fromCurrencyData) {
      if (fromCurrencyData.symbol) {
        document.getElementById("currency-symbol").innerHTML = fromCurrencyData.symbol;
      } else {
        document.getElementById("currency-symbol").innerHTML = "";
      }
    }
  }

  selectFromElement.addEventListener("change", updateCurrencySymbol);
  // On load function

  const currencyDropdowns = document.querySelectorAll(".currency-dropdown");
  currencyDropdowns.forEach((dropdown) => {
    addOptions(dropdown, myData.rates);
  });

  // Currency converter
  const formConvert = document.getElementById("currency-converter-form");
  formConvert.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Get the selected currencies and amount
    const selectedFromCurrency = selectFromElement.value;
    const selectedToCurrency = selectToElement.value;
    const inputAmount = parseFloat(amount.value);

    // Get the exchange rates for the selected currencies
    const rateFrom = myData.rates.find((rate) => rate.code === selectedFromCurrency).rate; //
    const rateTo = myData.rates.find((rate) => rate.code === selectedToCurrency).rate; //
    console.log(rateTo);
    // Perform the conversion and render it
    const convertedAmount = (inputAmount / rateFrom) * rateTo;
    const convertedAmountString = convertedAmount.toFixed(3);

    const selectedToCurrencyText = myData.rates.find(
      (rate) => rate.code === selectedToCurrency
    ).text; //
    const lastDigit = convertedAmountString.slice(-1);

    amountWanted.innerHTML = `${inputAmount} ${selectedFromCurrency} =`;
    amountResult.innerHTML = `${convertedAmountString.slice(
      0,
      -1
    )}<span class="lastdigit">${lastDigit}</span> ${selectedToCurrencyText}`;
    ratesNumbers.innerHTML = `1 ${selectedFromCurrency} = ${(rateTo / rateFrom).toFixed(
      4
    )} ${selectedToCurrency}`;
  });
  // Add Currency
  const formAdd = document.getElementById("add-currency-form");
  formAdd.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newRate = parseFloat(getRate.value);
    const newCurrencyCode = getCode.value.toUpperCase();
    const newCurrencyName = getName.value;

    const currencyExists = myData.rates.some((rate) => rate.code === newCurrencyCode);

    if (!currencyExists) {
      myData.rates.push({ code: newCurrencyCode, rate: newRate, text: newCurrencyName });

      // Add the new currency to all dropdowns
      const currencyDropdowns = document.querySelectorAll(".currency-dropdown");
      currencyDropdowns.forEach((dropdown) => {
        const newOption = document.createElement("option");
        newOption.value = newCurrencyCode;
        newOption.text = `${newCurrencyCode} - ${newCurrencyName}`;
        dropdown.appendChild(newOption);
      });
      // Add the new currency to the grid list
      const newGrid = document.createElement("div");
      newGrid.classList.add("grid-item");
      newGrid.textContent = `${newCurrencyCode} - ${newCurrencyName} - Rate = ${newRate}`;
      gridList.appendChild(newGrid);

      alert(`New currency ${newCurrencyCode} - ${newCurrencyName} added with rate ${newRate}`);
    } else {
      alert(`Currency code ${newCurrencyCode} already exists.`);
    }

    console.log(myData); // for check if it's added
  });

  // Update the grid
  const formUpdate = document.getElementById("update-currency-form");
  formUpdate.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    const updatedRate = parseFloat(document.getElementById("update-rate").value);
    const updatedCurrencyCode = document.getElementById("to-currency-update").value.toUpperCase();

    // Find the currency to update
    const currencyToUpdate = myData.rates.find((rate) => rate.code === updatedCurrencyCode);

    if (currencyToUpdate) {
      currencyToUpdate.rate = updatedRate;
      alert(`Rate for currency ${updatedCurrencyCode} updated to ${updatedRate}`);
    } else {
      alert(`Currency code ${updatedCurrencyCode} does not exist.`);
    }
    gridCreate();
    console.log(myData); // for check if it's updated
  });
  const buttonSwap = document.getElementById("swapButton");
  buttonSwap.addEventListener("click", async () => {
    const fromCurrency = selectFromElement.value;
    const toCurrency = selectToElement.value;
    selectFromElement.value = toCurrency;
    selectToElement.value = fromCurrency;
    updateCurrencySymbol();
  });

  // Grid creation for list
  function gridCreate() {
    const gridList = document.getElementById("gridList");
    gridList.innerHTML = "";
    myData.rates.forEach((rate) => {
      const newGrid = document.createElement("div");
      newGrid.classList.add("grid-item");
      newGrid.textContent = `${rate.code} - ${rate.text} - Rate = ${rate.rate}`;
      gridList.appendChild(newGrid);
    });
  }
  // Search currency

  const buttonSearch = document.getElementById("searchButton");

  buttonSearch.addEventListener("click", async () => {
    const buttonSearchInput = document.getElementById("searchInput").value;
    const query = buttonSearchInput.trim().toUpperCase();

    console.log(buttonSearchInput);
    const foundRate = myData.rates.find((rate) => {
      return rate.code.toUpperCase().includes(query) || rate.text.toUpperCase().includes(query);
    });

    const searchResult = document.getElementById("searchResult");

    if (foundRate) {
      searchResult.innerHTML = `1 Euro = ${foundRate.rate} ${foundRate.text} (${
        foundRate.code
      })<br> 1 ${foundRate.code} = ${(1 / foundRate.rate).toFixed(4)} Euro `;
    } else {
      searchResult.innerHTML = `Currency rate for ${buttonSearchInput} not found. Please try with different letters`;
    }
  });

  let isOpen;
  const openAndCloseAlert = (hour, minute, second, message) => {
    const moment = new Date();

    const targetTime = new Date();
    targetTime.setHours(hour, minute, second, 0);
    let timeDifference = targetTime - moment;

    if (timeDifference < 0) {
      targetTime.setDate(targetTime.getDate() + 1);
      timeDifference = targetTime - moment;
    }
    isOpen = moment.getHours() > 9 && moment.getHours() < 17;

    setTimeout(() => {
      alert(message);

      openAndCloseAlert(hour, minute, second, message);
    }, timeDifference);
  };

  openAndCloseAlert(9, 0, 0, "Market is open now!"); // Opening Time alert
  openAndCloseAlert(17, 0, 0, "Market is closed now!"); // Closing Time alert

  const pushAlertToList = document.getElementById("alert-currency-form");
  pushAlertToList.addEventListener("submit", async (event) => {
    event.preventDefault();
    const alertCurrency = document.getElementById("to-currency-alert").value;
    const alertRate = document.getElementById("alert-rate").value;
    const objAlert = {
      code: alertCurrency,
      rate: alertRate,
    };
    alertCurrencies.push(objAlert);
    console.log(alertCurrencies);
  });

  function observer() {
    alertCurrencies = alertCurrencies.filter((alertCurrency) => {
      const currentRate = myData.rates.find((rate) => rate.code === alertCurrency.code).rate;

      if (currentRate !== undefined && currentRate == alertCurrency.rate) {
        alert(
          `Alert: ${alertCurrency.code} has reached the alert rate of ${alertCurrency.rate}. Current rate: ${currentRate}`
        );
        return false; // Remove this alert from the list
      }
      return true; // Keep this alert in the list
    });
  }
  let marketStatus = () => {
    console.log(`is open : ${isOpen}`);
    const marketStatusElement = document.getElementById("market-status-icon");
    const marketStatusText = document.getElementById("market-status-text");
    marketStatusText.textContent = isOpen ? "Market is Open" : "Market is Closed";
    marketStatusElement.className = isOpen ? "open" : "closed";
  };

  marketStatus();
  setInterval(observer, 5000);

  updateCurrencySymbol();
  gridCreate();
}
getData();
