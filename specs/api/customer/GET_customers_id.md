# Customer

    GET api/customers/:id

## Description
Returns customer with id

## Return format
- **customers** — The customer

## Errors
None

## Example
**Request**
http://localhost:9000/api/customers/2

**Return**
``` json
{
  "id": 2,
  "name": "Mehmet",
  "photo": "photourl"
}
```