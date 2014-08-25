# Campaigns
    GET api/campaigns

## Description
Returns campaigns.

## Return format
- **campaigns** — Campaigns Array

## Errors
None

## Example
**Request**
http://localhost:9000/api/campaigns

**Return**
``` json
[
  {
    "id": 3,
    "name": "Anneler Günü Kampanyası",
    "discountPercentage": 15,
    "discountAmount": null 
  
  },
  {
    "id": 8,
    "name": "Babalar Günü Kampanyası",
    "discountPercentage": null,
    "discountAmount": 9.99
  }
]
```