const CustomerService = require("./src/service")

// take customer ID from parameters
const customerID = process.argv[2] || "34-0987678-96567"

// create invoice for the customer
CustomerService.createInvoice({ id: customerID }).catch(console.error)
