const getCurrency = (currency_id) => {
    return currency_id === 'ARS' ? '$' : `${currency_id} `
}
module.exports = { getCurrency }