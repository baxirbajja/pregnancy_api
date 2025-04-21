# Pregnancy Tracking API Documentation

## Overview
This API provides detailed pregnancy information week by week, including baby development, body changes, and helpful tips for expectant mothers.

## API Endpoints

### Get All Pregnancy Data
```http
GET /api/pregnancy
```
Returns information for all pregnancy weeks (1-40).

### Get Specific Week Data
```http
GET /api/pregnancy/week/:weekNumber
```
Returns information for a specific pregnancy week.

Parameters:
- `weekNumber` (number): Week of pregnancy (1-40)

Example Response:
```json
{
  "week": 1,
  "baby_development": "Description of baby's development",
  "body_changes": "Description of body changes",
  "tips": ["Tip 1", "Tip 2"],
  "image": "image_url"
}
```

## Mobile App Integration

### Android (Kotlin)
```kotlin
val client = OkHttpClient()
val request = Request.Builder()
    .url("https://your-api-domain.com/api/pregnancy/week/1")
    .build()

client.newCall(request).enqueue(object : Callback {
    override fun onFailure(call: Call, e: IOException) {
        // Handle error
    }
    override fun onResponse(call: Call, response: Response) {
        val responseData = response.body?.string()
        // Parse JSON and update UI
    }
})
```

### iOS (Swift)
```swift
let url = URL(string: "https://your-api-domain.com/api/pregnancy/week/1")!
let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
    if let error = error {
        // Handle error
        return
    }
    if let data = data {
        // Parse JSON and update UI
    }
}
task.resume()
```

## Deployment Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
PORT=3000
NODE_ENV=production
```

3. Deploy to a cloud platform:

### Heroku Deployment
```bash
heroku create your-app-name
git add .
git commit -m "Initial deployment"
git push heroku main
```

### Railway Deployment
```bash
railway init
railway up
```

## Error Handling
The API returns standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Week not found
- 500: Server Error

## Rate Limiting
Requests are limited to 100 per hour per IP address to ensure service stability.

## Security
- HTTPS enforced for all requests
- CORS enabled for mobile app domains
- API key required for production use

## Support
For technical support or questions, please open an issue in the repository or contact the development team.