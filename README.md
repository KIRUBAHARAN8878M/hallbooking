# hallbooking


HallBookkingapi

GET : // To get all Room Data

https://roombooking-api.herokuapp.com/

GET : //To get booked customer details

https://roombooking-api.herokuapp.com/booked-customer-details

GET : //To get booked room details

https://roombooking-api.herokuapp.com/booked-room-details

POST : // To creaate a room

https://roombooking-api.herokuapp.com/create-room

Bodyraw (json)
json :

{
  "name": "medium",
  "seats": 40,
  " roomId": "003",
  "amenities": [
    "internet_access",
    "food",
    "ac",
    "tv"
  ],
  "price": 750,
  "BookingStatus": "Occupied",
  "customerDetails": {
    "cutstomerName": "Thala",
    "date": "2022-10-05",
    "start": "16:00",
    "end": "21:00",
    "roomId": "003",
    "status": "Booked"
  }
}

POST : //To book a room

https://roombooking-api.herokuapp.com/room-booking

Bodyraw (json)
json :

{
      "customerName" : "Super Star",
      "date" : "2022-10-05",
      "start" : "16:00",
      "end" : "21:00",
      "roomId" : "002"
      
}
