const { findCustomer, updateCustomer } = require("./data")

const createInvoice = async ({ id }) => {
    const customer = await findCustomer({ id })
    console.log("found", JSON.stringify(customer))
    const invoice = {
        amount: 100,
        createdAt: new Date()
    }
    const result = await updateCustomer({ id, invoice })
    console.log("invoiced", JSON.stringify(result))
}

module.exports = { createInvoice }