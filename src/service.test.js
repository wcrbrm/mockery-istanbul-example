const CustomerService = require("./service")

const mockery = require('mockery')
const chai = require("chai")
// const assert = require('assert')
// const should = chai.should();
const { expect } = chai
chai.use(require('chai-as-promised'))

const customerID = "TEST-111093-34"

describe("service @unit", () => {
    // these 2 functions are overriden for compaction purposes
    const registerData = ({ findCustomer, updateCustomer }) => () => {
        mockery.registerMock('./data', { findCustomer, updateCustomer });
    }
    const deregisterData = () => { mockery.deregisterMock('./data'); }

    // note: beforeEach is used, mockery.enable should be called AFTER registrerMock
    // important: warnOnUnregistered==TRUE !
    beforeEach(() => { mockery.enable({ warnOnReplace: true, warnOnUnregistered: true}); });

    describe("when findCustomer fails", () => {
        before(registerData({
            findCustomer: () => (new Promise((_, reject) => reject(new Error("failure"))))
        }))
        after(deregisterData)

        it('fails to invoice', async () => {
            await expect(CustomerService.createInvoice({ id: customerID })).to.be.rejected
        });
    })

    describe("when findCustomer works", () => {
        // mocks of successfull function execution:
        const findCustomer = ({ id }) => ({ _id: id, firstName: "John", lastName: "Snow"})
        const updateCustomer = ({ id, doc }) => ({ _id: id, rev: (new Date()).getTime() })

        describe("when updateCustomer fails", () => {
            before(registerData({
                findCustomer,
                updateCustomer: () => (new Promise((_, reject) => reject(new Error("failure"))))
            }));
            after(deregisterData)

            it('fails to invoice', async () => {
                await expect(CustomerService.createInvoice({ id: customerID })).to.be.rejected
            });
        })
        describe("when updateCustomer works", () => {
            before(registerData({ findCustomer, updateCustomer }));
            after(deregisterData)

            it('invoices customer successfully', async () => {
                const result = await expect(CustomerService.createInvoice({ id: customerID })).not.to.be.rejected
                chai.assert(result)
                chai.assert(result.rev)
            });
        })

    })
})