# Products

    GET api/products/popular

## Description
Returns popular products

## Return format
- **products** — Popular products list

## Errors
None

## Example
**Request**
http://localhost:9000/api/products/popular

**Return**
``` json
[
  {
    "id": 3,
    "name": "Product 1",
    "price": 10.5,
    "photo": "photourl"
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 95,
    "photo": "photourl"
  },
  {
    "id": 1,
    "name": "Product 3",
    "price": 35.99,
    "photo": "photourl"
  }
]
```