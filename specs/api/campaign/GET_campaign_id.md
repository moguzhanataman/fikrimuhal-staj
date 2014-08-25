# Campaign by ID
    GET api/campaign/:id

## Description
Returns a campaign by ID

## Return format
- **campaigns** — The campaign

## Errors
None

## Example
**Request**
http://localhost:9000/api/campaign/3

**Return**
``` json
{
  "id": 3,
  "name": "Anneler Günü Kampanyası",
  "discountPercentage": 15,
  "discountAmount": null 
}
```