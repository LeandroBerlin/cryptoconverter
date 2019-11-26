class CryptoConverter {
    constructor() {
        this.apiUrl = "https://api.cryptonator.com/api/ticker"; // BTC->USD EUR ...
        this.entryField = document.querySelector(".entryField"); // Choose... BTC
        this.outputField = document.querySelector(".outputField");// Choose... EUR
        this.input = document.querySelector("#cryptoInput");
    }

    validate() {
        if (
            this.input.value === "0" ||
            this.entryField === "Choose..." ||
            this.outputField === "Choose..."
        ) {
            console.warn("Warning: you need to select the parameters")
            return false
        } else {
            return true
        }
    }


    async fetchApi() {

        if (!this.validate())
            return

        // TODO: refactor
        console.log(`${this.apiUrl}/${this.entryField.value}-${this.outputField.value}`)
        const req = fetch(`${this.apiUrl}/${this.entryField.value}-${this.outputField.value}`)
        const res = await req
        const currencyObj = await res.json()
        const price = currencyObj.ticker.price
        console.log(price)
        document.querySelector("#cryptoOutput").value = (price * this.input.value)
            .toFixed(2)
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }

    init() {
        document.querySelector("#conversion-form").addEventListener("submit", event => {
            event.preventDefault()
            console.log("Submit happend")
            this.fetchApi()
        })
        this.input.addEventListener("focus", e => e.target.value = "")
    }
}

const myCryptoConvert = new CryptoConverter()
window.addEventListener('load', () => myCryptoConvert.init())