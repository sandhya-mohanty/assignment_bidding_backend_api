# assignment_bidding_backend_api



## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Setup environment variables in `.env`
4. Run the server: `npm start`

## API Endpoints

### Auth
- POST /auth/register - Register a new user
- POST /auth/login - Login a user
- GET /auth/profile - Get logged-in user profile

### Items
- GET /items - Retrieve all items
- GET /items/:id - Retrieve item by ID
- POST /items - Create new item (authenticated users)
- PUT /items/:id - Update item (authenticated users)
- DELETE /items/:id - Delete item (authenticated users)

### Bids
- GET /items/:itemId/bids - Get all bids for item
- POST /items/:itemId/bids - Place bid on item (authenticated users)

### Notifications
- GET /notifications - Get notifications for logged-in user
- POST /notifications/mark-read - Mark notifications as read
