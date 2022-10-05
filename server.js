const express = require('express')
const app = express()

//middleware
app.use(express.json())



let rooms = [
  {
    id:1,
    name:"small",
    seats : 20,
    roomId: 001,
    amenities : ["internet_access","food","ac","tv"],
    price:500,
    BookingStatus : "Occupied",
    customerDetails : {
      customerName : "Thalapathy",
      date : "2022-10-05",
      start : "16:00",
      end : "21:00",
      roomId : "001",
      status : "Booked",
    }
  },
  {
    id:2,
    name:"Large",
    seats : 75,
    roomId: 002,
    amenities : ["internet_access","food","ac","tv"],
    price:1000,
    BookingStatus : "Available",
    customerDetails : {
        customerName : "",
      date : "",
      start : "",
      end : "",
      roomId : "",
      status : "",
    }
  },
  {
    id:3,
    name:"medium",
    seats : 50,
    roomId: 003,
    amenities : ["internet_access","food","ac","tv"],
    price:750,
    BookingStatus : "Available",
    customerDetails : {
        customerName : "",
      date : "",
      start : "",
      end : "",
      roomId : "",
      status : "",
    }
  },
  {
    id:4,
    name:"extra large",
    seats : 100,
    roomId: 004,
    amenities : ["internet_access","food","ac","tv"],
    price:1500,
    BookingStatus : "Occupied",
    customerDetails : {
      customerName : "Thala",
      date : "2022-10-06",
      start : "16:00",
      end : "21:00",
      roomId : "004",
      status : "Booked",
    }
  }
];

// get all data from room
app.get('/', function (req, res) {
  res.send(rooms)
})

// 
//create room
app.post('/create-room', function (req, res) {
  try {
    req.body.id = rooms.length + 1;
    rooms.push(req.body)
    res.json({
      statusCode:200,
      message:"Room created successfully",
      
    })
  } catch (error) {
    console.log(error);
    res.json({
      statusCode:500,
      message:"Internal Server Error",
      error,
    })
  }
})

// Room booking
app.post('/room-booking', function (req, res) {
  try {
    let booked = false;
    let validRoomid = true;
    rooms.forEach((item) => {
      if (item.roomId == req.body.roomId) {
         validRoomid = false;
        if (new Date(item.customerDetails.date).getTime() != new Date(req.body.date).getTime() && item.customerDetails.start != req.body.start) {
          item.customerDetails.customerName = req.body.customerName,
            item.customerDetails.date = req.body.date,
            item.customerDetails.start = req.body.start,
            item.customerDetails.end = req.body.end,
            item.customerDetails.roomId = req.body.roomId,
            item.customerDetails.status = "Booked",
            item.BookingStatus = "Occupied",
            booked = true;
         
        }
      }

    })

    if (booked) {
      res.json({
        message: "Booking Successfull"
      })
    }
    if(validRoomid){
      res.json({
        message: "Please Enter Valid Room"
      })
    } else {
      res.json({
        message: "Booking Failed",
        instruction: "Sorry! Room is Already Booked and check the availability"
      })
    }

  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    })
  }
})

   

// booked-customer-details

app.get('/booked-customer-details', function (req, res) {
  
try {
  let data = [];

  rooms.forEach((item)=>{
    if(item.BookingStatus == "Occupied"){
      data.push(item.customerDetails)
    }
  })
  res.json({
    statusCode:200,
    Booked_Customer_Details : data,
  })
  
} catch (error) {
  res.json({
    statusCode: 500,
    message: "Internal Server Error",
    error,
  })
}

})


// Booked Room Details

app.get('/booked-room-details', function (req, res) {
  
  try {
    let data = [];
  
    rooms.forEach((item)=>{
      if(item.BookingStatus == "Occupied"){
        data.push({
          name:item.name,
          seats : item.seats ,
          amenities :item.amenities,
          price:item.price,
          BookingStatus : item.BookingStatus,
          customerName :item.customerDetails.customerName ,
          date :item.customerDetails.date ,
          start :item.customerDetails.start ,
          end :item.customerDetails.end ,
          roomId : item.customerDetails.roomId,
            
          
        })
      }
    })
    res.json({
      statusCode:200,
      Booked_Room_Details : data,
    })
    
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    })
  }
  
  })

app.listen(3000)