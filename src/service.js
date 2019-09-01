
const createInvoice = async ({ id }) => {
    const { findCustomer, updateCustomer } = require("./data")

    const customer = await findCustomer({ id })
    console.log("found", JSON.stringify(customer))
    const invoice = { 
        amount: 100, 
        createdAt: new Date()
    }
    const result = await updateCustomer({ id, doc: { ...customer, invoice} })
    console.log("invoiced", JSON.stringify(result))
    return result;
}

module.exports = { createInvoice }