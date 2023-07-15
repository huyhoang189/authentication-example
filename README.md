# authentication-example

# API Document

## Sign in

curl --location 'http://localhost:3030/api/v1/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
"name" : "huyhoang",
"email" : "emails@com",
"password" :"123456"
}'

## Sign up

curl --location 'http://localhost:3030/api/v1/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "emails@com",
"password" :"123456"
}'

## Refresh Token

curl --location 'http://localhost:3030/api/v1/refreshtoken' \
--header 'Content-Type: application/json' \
--data '{
"userId" : "user-id-here",
"refreshToken" :"refresh-token-here"
}'

## Test authen

curl --location 'http://localhost:3030/api/v1/users' \
--header 'Authorization: access-token-here' \
--header 'x-client-id: user-id-here'
