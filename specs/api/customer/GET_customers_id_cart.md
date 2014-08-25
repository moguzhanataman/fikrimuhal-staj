# Customer Cart

    GET api/customers/:id

## Description
Returns customers cart

## Return format
- **id** — ID of cart
- **customerId** — Customer ID
- **employeeId** — Employee ID
- **itemList** — Product Array

## Errors
None

## Example
**Request**
http://localhost:9000/api/customer/5/cart

**Return**
``` json
{
  "id": 1,
  "customerId": 2,
  "employeeId": 3,
  "itemList": [
    {
      "id": 1,
      "name": "Kırmızı tişört",
      "price": 35.99,
      "popularity": 1,
      "photo": "photourl"
    },
    {
      "id": 2,
      "name": "Kot pantolon",
      "price": 95,
      "popularity": 2,
      "photo": "photourl"
    },
    {
      "id": 3,
      "name": "Falan filan",
      "price": 10.5,
      "popularity": 3,
      "photo": "photourl"
    }
  ]
}
```