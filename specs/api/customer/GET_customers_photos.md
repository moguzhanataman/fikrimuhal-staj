# Customer Photos
    GET api/customers/photos

## Description
Returns all customer photos. All images retrieved at once because we want to cache all of these images in employee's mobile device. More than one HTTP Request slow down application.

## Return format
- **photos** — Base64 encoded images of customers

## Errors
None

## Example
**Request**
http://localhost:9000/api/customer/photos

**Return**
``` json
[
  {"customerId": 6, "image": "BASE64 ENCODED IMAGE HERE"},
  {"customerId": 17, "image": "BASE64 ENCODED IMAGE HERE"},
  {"customerId": 58, "image": "BASE64 ENCODED IMAGE HERE"},
]
```