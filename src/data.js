// EXAMPLE data layer

// findCustomer - example of the database request to get customer
const findCustomer = ({ id }) => {
    return new Promise((resolve) =>  {
        setTimeout(() => resolve({
            _id: id,
            firstName: "John",
            lastName: "Snow"
        }), 500)
    })
}

// updateCustomer - example of the database request to update custoemr
const updateCustomer = ({ id, doc }) => {
    return new Promise((resolve) =>  {
        setTimeout(() => {
            console.log("customer was updated", id )    
            resolve({ _id: id, rev: (new Date()).getTime() })
        }, 300)
    })
}

module.exports = { findCustomer, updateCustomer };