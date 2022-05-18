const crypto = require("crypto")

const CustomerRepository = () => {
  const customers = new Map()
  return {
    find: (query) => Array.from(customers.values()),
    existsById: (id) => customers.has(id),
    existsByEmail: (email) => Array.from(customers.values()).some(customer => email === customer.email),
    findById: (id) => customers.get(id),
    create: (dto) => {
      const id = crypto.randomUUID()
      const newCustomer = {...dto, id}
      customers.set(id, newCustomer)
      return newCustomer
    },
    updateById: (id, dto) => {
      const customerFound = customers.get(id)
      Object.assign(customerFound, dto)
      return customerFound
    },
    deleteById: (id, deletedBy) => {
      customers.delete(id)
    },
  }
}

module.exports = { CustomerRepository }
