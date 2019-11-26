const apiUrl = "https://api.cryptonator.com/api/ticker"; // BTC->USD EUR ...
const entryField = document.querySelector(".entryField"); // Choose... BTC
const outputField = document.querySelector(".outputField");// Choose... EUR
const form = document.querySelector("#conversion-form");
const input = document.querySelector("#cryptoInput");
const output = document.querySelector("#cryptoOutput");

const validate = () => {
    if (
        input.value === "0" ||
        entryField === "Choose..." ||
        outputField === "Choose..."
    ) {
        console.warn("Warning: you need to select the parameters")
        return false
    } else {
        return true
    }
}

const fetchApi = async () => {
    // async/await

    // check the data - do I have data for the fetch? VALIDATION
    if (!validate())
        return

    console.log(`${apiUrl}/${entryField.value}-${outputField.value}`)
    const req = fetch(`${apiUrl}/${entryField.value}-${outputField.value}`)
    const res = await req
    const currencyObj = await res.json()
    const price = currencyObj.ticker.price
    console.log(price)
    output.value = (price * input.value).toFixed(2)
}

const init = () => {

    form.addEventListener("submit", event => {
        event.preventDefault()
        console.log("Submit happend")
        // fetch <-
        fetchApi()
    })

    input.addEventListener("focus", e => e.target.value = "")

}

window.addEventListener('load', init)