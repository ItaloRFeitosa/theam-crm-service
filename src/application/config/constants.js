const resolveBoolean = (value = "", defaultValue) => {
  if(value === "false"){
    return false
  }

  if(value === "true"){
    return true
  }

  return defaultValue
}

module.exports = {
  STAGE: process.env.NODE_ENV || "development",
  ENABLE_SWAGGER: resolveBoolean(process.env.ENABLE_SWAGGER, true),
  MONGO_URI: process.env.MONGO_URI,
  CUSTOMERS_BUCKET_NAME: process.env.CUSTOMERS_BUCKET_NAME || "crm-customers-bucket"
}
