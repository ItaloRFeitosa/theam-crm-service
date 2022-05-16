const { createConnection, isConnected, disconnect } = require("#external/database/mongodb/connection")

describe("MongoDB Connection", () => {
  it("should connect and disconnect to database", async () => {
    await createConnection()
    expect(isConnected()).toBeTruthy()
    await disconnect()
    expect(isConnected()).toBeFalsy()
  })
})
