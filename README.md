# THEAM CRM Service

# Features

The CRM Service is divided in 3 modules: Customer, User and Authentication modules.

## Customer Module

This module is responsible to manage customer related features, such as:

- CRUD operations to customer records
- Customer photo upload
- Module restricted to authenticated users

## User Module

This module is responsible to manage user related features, such as:

- CRUD operation to user records
- Change user to admin status
- Module restricted to authenticated users that have admin role

## Authentication Module

This module is responsible to manage auth related features, such as:

- sign-in with user account credentials
- Ensure authorization on protected resources
- Ensure role-based access

# How to Install

Built with NodeJS v16.15.0 and npm v8.5.5 to build the apps. You need Docker, Docker-compose and Makefile available in your machine. Then, you only need to clone the repo and run `make infra`. This command will setup docker containers related to the api, mongodb instance, minio instance, and an admin user: email:`root@root.com` , password:`rootadmin`. After this, you can hit the following url:  `http://localhost:3333/health-check`. 

if return a successful message, you are ready to go.

You can also:
- attach to logs with `make attach_logs`
- stop with `make stop`
- start with `make up`
- remove with `make destroy`

# How to Use

Before proceeding, make sure that the services are running.

You can see the swagger page with the following URL: `http://localhost:3333/docs`

Besides that, I made a Postman’s collection with all the endpoints available, you can find them in the directory `./docs.

To upload customer image, you use the signedUrl received from `PATCH /customers/{customerId}/photo`. Make a PUT request with file as multipart/form-data. You can easily do that in the postman collection.



# How to Run Tests

Until now, Only auth routes have been covered with integration tests. You can run it with `npm run test:integration`

# How to Deploy

You can build a docker image from the Dockerfile and run the container with the following env vars:
```bash
PORT=<default is 3333>
NODE_ENV=production
ENABLE_SWAGGER=<true or false>
MONGO_URI=<mongo uri to connect>
CUSTOMERS_BUCKET_NAME=<aws s3 bucket name>
JWT_PRIVATE_KEY=
JWT_PUBLIC_KEY=
JWT_PASSPHRASE=
JWT_EXPIRES=<default is 15 min>
```

# Tech Stack

- NodeJS v16.15
- MongoDB
- Minio (Tool AWS S3 compatible)
- mongoose
- express
- jsonwebtoken
- bcrypt
- yup
- swagger-ui-express