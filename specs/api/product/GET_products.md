# Products

    GET api/products

## Description
Returns all products

## Return format
- **products** — All products list

## Errors
None

## Example
**Request**
http://localhost:9000/api/products

**Return**
``` json
[
   {
      "id": 3,
      "name": "Ürün 1",
      "price": 10.5,
      "photo": "photourl"
   },
   {
      "id": 2,
      "name": "Ürün 2",
      "price": 95,
      "photo": "photourl"
   },
   {
      "id": 1,
      "name": "Ürün 3",
      "price": 35.99,
      "photo": "photourl"
   }
]
```