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
    "name": "Falan filan",
    "price": 10.5,
    "popularity": 3,
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
    "id": 1,
    "name": "Kırmızı tişört",
    "price": 35.99,
    "popularity": 1,
    "photo": "photourl"
  }
]
```