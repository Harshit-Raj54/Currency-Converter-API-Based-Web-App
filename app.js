const selectFrom = document.querySelector("#from");
const selectTo = document.querySelector("#to");
const imgFrom = document.querySelector(".from img");
const imgTo = document.querySelector(".to img");
const input = document.querySelector("#amount_input");
const msg = document.querySelector("#msg_disp");
const button = document.querySelector("#exchange_btn");

const BASE_URL = "https://hexarate.paikama.co/api/rates/latest/";

// Populate dropdowns
for (let code in countryList) {
    let optionFrom = document.createElement("option");
    optionFrom.value = code;
    optionFrom.innerText = code;
    selectFrom.append(optionFrom);

    let optionTo = document.createElement("option");
    optionTo.value = code;
    optionTo.innerText = code;
    selectTo.append(optionTo);
}

// Update flags
function updateFlags() {
    imgFrom.src = `https://flagsapi.com/${countryList[selectFrom.value]}/flat/64.png`;
    imgTo.src = `https://flagsapi.com/${countryList[selectTo.value]}/flat/64.png`;
}

selectFrom.addEventListener("change", updateFlags);
selectTo.addEventListener("change", updateFlags);

// Conversion function
async function convertCurrency() {
    let from = selectFrom.value;
    let to = selectTo.value;
    let amount = parseFloat(input.value);

    if (isNaN(amount) || amount <= 0) amount = 1;

    let url = `${BASE_URL}${from}?target=${to}`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("API error");
        let data = await response.json();
        let rate = data.data.mid;

        let finalAmount = (amount * rate).toFixed(2);
        msg.innerText = `${amount} ${from} = ${finalAmount} ${to}`;
    } catch {
        msg.innerText = "Unable to fetch rates";
    }
}

// Button click
button.addEventListener("click", (e) => {
    e.preventDefault();
    convertCurrency();
});

// Allow Enter key to convert
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") convertCurrency();
});

// On page load
window.addEventListener("load", () => {
    selectFrom.value = "USD";
    selectTo.value = "INR";
    updateFlags();
    convertCurrency();
});
