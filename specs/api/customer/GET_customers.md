# Customers

    GET api/customers

## Description
Returns all customers available

## Return format
- **customers** — Customer list

## Errors
None

## Example
**Request**
http://localhost:9000/api/customers

**Return**
``` json
{
  "customers": [
    {
      "id": 1,
      "name": "Ahmet",
      "photo": "photourl"
    },
    {
      "id": 2,
      "name": "Mehmet",
      "photo": "photourl"
    },
    {
      "id": 3,
      "name": "Hilmi",
      "photo": "photourl"
    }
  ]
}
```