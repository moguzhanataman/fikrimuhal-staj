# Employee List
    GET api/employees

## Description
Returns all employees. Used for employee login screen.

## Return format
- **employees** — Array of employees

## Errors
None

## Example
**Request**
http://localhost:9000/api/employees

**Return**
``` json
[
  {"customerId": 6, "image": "BASE64 ENCODED IMAGE HERE"},
  {"customerId": 17, "image": "BASE64 ENCODED IMAGE HERE"},
  {"customerId": 58, "image": "BASE64 ENCODED IMAGE HERE"},
]
```