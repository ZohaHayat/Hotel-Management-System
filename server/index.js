const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const e = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

const path = express("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "doingdatabaseassignment",
  database: "authorization",
});

app.post("/register", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const password = req.body.password;
  const email = req.body.email;

  const hashed_password = bcrypt.hashSync(password, saltRounds);

  db.query(
    "SELECT * FROM customer WHERE email = (?)",
    [email],
    (err, result) => {
      if (result.length == 0) {
        db.query(
          "SELECT CustomerID as ID FROM customer",
          function (err, output) {
            if (output.length == 0) {
              db.query("INSERT INTO customer VALUES (?,?,?,?,?,?)", [
                1,
                email,
                fname,
                lname,
                hashed_password, // inserting hashed password
                0,
              ]);
            } else {
              db.query(
                "SELECT MAX(CustomerID) as id FROM customer",
                function (err, cust_id) {
                  db.query("INSERT INTO customer VALUES (?,?,?,?,?,?)", [
                    parseInt(cust_id[0].id) + 1,
                    email,
                    fname,
                    lname,
                    hashed_password, // inserting hashed password
                    0,
                  ]);
                }
              );
            }
          }
        );
        res.send("success");
      } else {
        res.send("Duplicate Error");
      }
    }
  );
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  db.query(
    "SELECT customer.email, customer.CustomerID, password FROM customer WHERE customer.email = (?)",
    [email],
    async (err, result) => {
      // added async here to make it an async function
      if (err) {
        console.log(err);
      } else if (result.length != 0) {

        bcrypt.compare(pass, result[0].password, function(err, hes){
          if(hes)
          {
            res.send(result);
          }
          else
          {
            res.send("Passwords Do Not Match")
          }
        });
      } else {
        db.query(
          "SELECT staff.email, staff.employee_type, staff.StaffID, password FROM staff WHERE staff.email = (?)",
          [email],
          async (err, result) => {
            if (err) 
            {
              console.log(err);
            } 
            else if (result.length != 0) 
            {
              bcrypt.compare(
                pass,
                result[0].password, function(err,hes2){
                  if(hes2)
                  {
                    res.send(result);
                  }
                  else
                  {
                    res.send("Passwords Do Not Match")
                  }
                });
            } 
            else 
            {
              res.send("User does not exist");
            }
          }
        );
      }
    }
  );
});

app.get("/viewinventory", (req, res) => {
  db.query(
    "SELECT inventory_item, category, quantity FROM inventory",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// hire staff use case
app.post("/hiringstaff", (req, res) => {

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const employee_type = req.body.employee_type;
  const salary = req.body.salary;
  const shift = req.body.shift;


  db.query("SELECT * FROM staff WHERE email = (?)",
  [email],
  (err, result) => {
    if (result.length == 0)
    { 
      db.query("SELECT staffID FROM staff", function(err, output)
      {
        if(output.length == 0)
        {
          db.query("INSERT INTO staff VALUES (?,?,?,?,?,?,?,?)",
              [1, email, fname, lname, password, employee_type, salary, shift]
            )
        }
        else
        {
          db.query("SELECT MAX(StaffID) as id FROM staff", function (err,staff_id)
            {
              db.query("INSERT INTO staff VALUES (?,?,?,?,?,?,?,?)",
                [parseInt(staff_id[0].id) + 1, email, fname, lname, password, employee_type, salary, shift]
              )
            }
          );
        }
      });
      res.send("success");
    }
    else
    {
      res.send("Duplicate Error");
    }
  }
);
});

app.post("/firingstaff", (req, res) => {
  //
  const email = req.body.email;
  db.query("SELECT * FROM staff WHERE email = (?)", [email], (err, result) => {
    if (result.length != 0) {
      db.query(
        "DELETE FROM staff WHERE email = (?)",
        [email],
        function (err, result) {
          if (err) {
            console.log("user err");
            console.log(err);
          } else {
            res.send("success");
          }
        }
      );
    } else {
      res.send("Staff not found");
    }
  });
});

app.post("/additem", (req, res) => {
  const inventory_item = req.body.inventory_item;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const staffid = req.body.staff_id;
  const date = req.body.date;

  db.query(
    "SELECT inventory_item FROM inventory WHERE inventory_item = (?)",
    [inventory_item],
    (err, result) => {
      if (result.length == 0) {
        db.query("INSERT INTO inventory VALUES (?,?,?,?,?)", [
          inventory_item,
          staffid,
          category,
          quantity,
          date,
        ]);
        res.send("success");
      } else {
        res.send("Duplicate Error");
      }
    }
  );
});

app.post("/removeitem", (req, res) => {
  const inventory_item = req.body.inventory_item;

  db.query(
    "SELECT inventory_item FROM inventory WHERE inventory_item = (?)",
    [inventory_item],
    (err, result) => {
      if (result.length != 0) {
        db.query("DELETE FROM inventory WHERE inventory_item = (?)", [
          inventory_item,
        ]);
        res.send("success");
      } else {
        res.send("Not found Error");
      }
    }
  );
});

app.post("/changequantity", (req, res) => {
  const inventory_item = req.body.inventory_item;
  const quantity = req.body.quantity;

  db.query(
    "SELECT inventory_item FROM inventory WHERE inventory_item = (?)",
    [inventory_item],
    (err, result) => {
      if (result.length != 0) {
        db.query(
          "UPDATE inventory SET quantity = (?) WHERE inventory_item = (?)",
          [quantity, inventory_item]
        );
        res.send("success");
      } else {
        res.send("Not found Error");
      }
    }
  );
});

app.get("/viewrooms", (req, res) => {
  db.query(
    "SELECT room_number, type_of_room, status FROM hotel_rooms WHERE status = 'Available'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/makereservations", (req, res) => {

  const room_type = req.body.room_type;
  const checkin = req.body.checkindate;
  const checkout = req.body.checkoutdate;
  const custid = req.body.custid;
  const bookingdate = req.body.date;

  db.query("SELECT type_of_room, room_rate FROM room_rates WHERE type_of_room = (?)",
  [room_type],
  (err, result) => {
    if (result.length != 0)
    {
      db.query("SELECT room_number FROM hotel_rooms WHERE type_of_room = (?) and status = 'Available' LIMIT 1",
        [room_type],
        (err, result2) => {
          if (result2.length == 0)
          {
            res.send("All such rooms are booked")
          }
          else
          {
            db.query("SELECT BookingID FROM reservations", function(err, output){
              if(output.length == 0)
              {
                db.query("UPDATE customer SET payments_due = payments_due + (?) WHERE CustomerID = (?)",
                  [result[0].room_rate, custid]
                )
                db.query("UPDATE hotel_rooms SET status = 'Not available' WHERE room_number = (?)",
                [result2[0].room_number]
                )
                db.query("INSERT INTO reservations VALUES (?,?,?,?,?,?)",
                  [1,result2[0].room_number,custid,bookingdate,checkin, checkout]
                )
                res.send("success");
              }
              else
              {
                db.query("UPDATE customer SET payments_due = payments_due + (?) WHERE CustomerID = (?)",
                  [result[0].room_rate, custid]
                )
                db.query("UPDATE hotel_rooms SET status = 'Not available' WHERE room_number = (?)",
                [result2[0].room_number]
                )
                db.query("SELECT MAX(BookingID) as id FROM reservations", function (err,booking_id)
                {
                  db.query("INSERT INTO reservations VALUES (?,?,?,?,?,?)",
                  [parseInt(booking_id[0].id) + 1,result2[0].room_number,custid,bookingdate,checkin, checkout]
                  )
                  res.send(booking_id);
                });
              }
            });
          }
        }
      )
    }
    else
    {
      res.send("No room found");
    }
  }
);
});

app.post("/cancelreservations", (req, res) => {
  const booking_id = req.body.bookingid;
  const cust_id = req.body.custid;

  db.query(
    "SELECT bookingID, room_number FROM reservations WHERE bookingID = (?) and CustomerID = (?)",
    [booking_id, cust_id],
    (err, result) => {
      if (result.length != 0) {
        db.query(
          "UPDATE hotel_rooms SET status = 'Available' WHERE room_number = (?)",
          [result[0].room_number]
        );
        db.query("DELETE FROM reservations WHERE bookingID = (?)", [
          booking_id,
        ]);
        res.send("success");
      } else {
        res.send("No booking found");
      }
    }
  );
});

// update account information for staff
app.post("/supdateaccinfo", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const staff_id = req.body.staff_id;

  db.query(
    "UPDATE staff SET First_Name = (?), Last_Name = (?) WHERE StaffID = (?)",
    [fname, lname, staff_id]
  );
  res.send("success");
});

// update account information for customer
app.post("/cupdateaccinfo", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const cust_id = req.body.cust_id;

  db.query(
    "UPDATE customer SET First_Name = (?), Last_Name = (?) WHERE CustomerID = (?)",
    [fname, lname, cust_id]
  );
  res.send("success");
});

// Set room rate
app.post("/setroomrate", (req, res) => {
  const newrate = req.body.newrate;
  const roomtype = req.body.roomtype;

  db.query(
    "SELECT * FROM room_rates WHERE Type_of_room = (?)",
    [roomtype],
    (err, result) => {
      if (result.length != 0) {
        // room type exists
        db.query(
          "UPDATE room_rates SET Room_rate = (?) WHERE Type_of_room = (?)",
          [newrate, roomtype]
        );
        res.send("success");
      } else {
        res.send("room does not exist");
      }
    }
  );
});

app.post("/makepayment", (req, res) => {
  const payment = req.body.payment_amount;
  const custid = req.body.custid;

  db.query(
    "SELECT payments_due FROM customer WHERE CustomerID = (?)",
    [custid],
    (err, result) => {
      if (result[0].payments_due != "0") {
        db.query(
          "UPDATE customer SET payments_due = (?) WHERE CustomerID = (?)",
          [result[0].payments_due - payment, custid]
        );
        res.send("success");
      } else {
        res.send("No payments due");
      }
    }
  );
});

app.post("/deleteroom", (req, res) => {
  const roomnum = req.body.room_number;

  db.query(
    "SELECT * FROM hotel_rooms WHERE room_number = (?)",
    [roomnum],
    (err, result) => {
      if (result.length != 0) {
        db.query(
          "SELECT room_number FROM reservations WHERE room_number = (?)",
          [roomnum],
          (err, result2) => {
            if (result2.length == 0) {
              db.query("DELETE FROM hotel_rooms WHERE room_number = (?)", [
                roomnum,
              ]);
              res.send("success");
            } else {
              res.send("This room is booked.");
            }
          }
        );
      } else {
        res.send("This room number does not exist");
      }
    }
  );
});

app.get("/viewstaff", (req, res) => {
  db.query(
    "SELECT staffID, first_name, last_name, employee_type, salary, shift_type FROM staff",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addfacility", (req, res) => {
  const name = req.body.name;
  const rate = req.body.rate;

  db.query(
    "SELECT * FROM facilities WHERE name_of_facility = (?)",
    [name],
    (err, result) => {
      if (result.length == 0) {
        db.query("SELECT * FROM facilities", function (err, number) {
          if (number.length == 0) {
            db.query("INSERT INTO facilities VALUES (?,?,?)", [1, name, rate]);
          } else {
            db.query(
              "SELECT MAX(FacilityID) as id FROM facilities",
              function (err, facility_id) {
                db.query("INSERT INTO facilities VALUES (?,?,?)", [
                  parseInt(facility_id[0].id) + 1,
                  name,
                  rate,
                ]);
              }
            );
          }
        });
        res.send("success");
      } else {
        res.send("Facility already exists.");
      }
    }
  );
});

app.post("/deletefacility", (req, res) => {
  //
  const name = req.body.name;
  db.query(
    "SELECT * FROM facilities WHERE name_of_facility = (?)",
    [name],
    (err, result) => {
      if (result.length != 0) {
        db.query(
          "DELETE FROM facilities WHERE name_of_facility = (?)",
          [name],
          function (err, result) {
            if (err) {
              console.log("facility error");
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        res.send("Facility does not exist");
      }
    }
  );
});

app.post("/availfacility", (req, res) => {
  const name = req.body.facility_name;
  const quantity = req.body.quantity;
  const custID = req.body.custID;
  date = req.body.date;

  db.query(
    "SELECT BookingID, room_number FROM reservations WHERE customerID = (?)",
    [custID],
    (err, result) => {
      if (result.length == 0) {
        res.send("no booking");
      } else {
        db.query(
          "SELECT facilityID from facilities WHERE Name_of_facility = (?)",
          [name],
          function (err, result2) {
            if (result2.length != 0) {
              db.query("INSERT INTO facilities_availed VALUES (?,?,?,?,?)", [
                result[0].BookingID,
                result[0].room_number,
                date,
                result2[0].facilityID,
                quantity,
              ]);
              res.send("success");
            } else {
              res.send("facility does not exist");
            }
          }
        );
      }
    }
  );
});

// change staff schedule use case
app.post("/setstaffsch", (req, res) => {
  const sch = req.body.sch;
  const email = req.body.email;

  db.query("SELECT * FROM staff WHERE email = (?)", [email], (err, result) => {
    if (result.length != 0) {
      db.query("UPDATE staff SET Shift_type = (?) WHERE email = (?)", [
        sch,
        email,
      ]);
      res.send("success");
    } else {
      res.send("Does not exist");
    }
  });
});

app.post("/staffreservations", (req, res) => {

  const email = req.body.email;
  const room_type = req.body.room_type;
  const checkin = req.body.checkindate;
  const checkout = req.body.checkoutdate;
  const bookingdate = req.body.date;

  let book = 0;

  db.query("SELECT type_of_room, room_rate FROM room_rates WHERE type_of_room = (?)",
  [room_type],
  (err, result) => {
    if (result.length != 0)
    {
      db.query("SELECT room_number FROM hotel_rooms WHERE type_of_room = (?) and status = 'Available' LIMIT 1",
        [room_type],
        (err, result2) => {
          if (result2.length == 0)
          {
            res.send("All such rooms are booked")
          }
          else
          {
            db.query("SELECT BookingID FROM reservations", function(err, output){
              if(output.length == 0)
              {
                db.query("SELECT customerid FROM customer WHERE email = (?)", [email], (err, result3) =>{
                  if(result3.length !=0)
                  {
                    db.query("UPDATE customer SET payments_due = payments_due + (?) WHERE email = (?)",
                      [result[0].room_rate, email]
                    )
                    db.query("UPDATE hotel_rooms SET status = 'Not available' WHERE room_number = (?)",
                    [result2[0].room_number]
                    )
                    db.query("INSERT INTO reservations VALUES (?,?,?,?,?,?)",
                      [1,result2[0].room_number,result3[0].customerid,bookingdate,checkin, checkout]
                    )
                    res.send("success");
                  }
                  else
                  {
                    res.send("This customer does not exist")
                  }
                });
              }
              else
              {
                db.query("SELECT MAX(BookingID) as id FROM reservations", function (err,booking_id)
                {
                  db.query("SELECT customerid FROM customer WHERE email = (?)", [email], (err, result3) =>{
                    if(result3.length !=0)
                    {
                      db.query("UPDATE customer SET payments_due = payments_due + (?) WHERE email = (?)",
                        [result[0].room_rate, email]
                      )
                      db.query("UPDATE hotel_rooms SET status = 'Not available' WHERE room_number = (?)",
                      [result2[0].room_number]
                      )
                      db.query("INSERT INTO reservations VALUES (?,?,?,?,?,?)",
                      [parseInt(booking_id[0].id) + 1,result2[0].room_number,result3[0].customerid,bookingdate,checkin, checkout]
                      )
                      book = parseInt(booking_id[0].id) + 1;
                      res.send(booking_id);
                    }
                    else
                    {
                      res.send("This customer does not exist");
                    }
                  });
                });
              }
            });
          }
        }
      )
    }
    else
    {
      res.send("No room found");
    }
  }
);
});

app.post("/staffcancelreservations", (req, res) => {
  const booking_id = req.body.bookingid;

  db.query(
    "SELECT bookingID, room_number FROM reservations WHERE bookingID = (?)",
    [booking_id],
    (err, result) => {
      if (result.length != 0) {
        db.query(
          "UPDATE hotel_rooms SET status = 'Available' WHERE room_number = (?)",
          [result[0].room_number]
        );
        db.query("DELETE FROM reservations WHERE bookingID = (?)", [
          booking_id,
        ]);
        res.send("success");
      } else {
        res.send("No booking found");
      }
    }
  );
});

app.get("/staffavailablerooms", (req, res) => {
  db.query(
    "SELECT room_number, type_of_room, status FROM hotel_rooms WHERE status = 'Available'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/bookings", (req, res) => {
  const date = req.params.date;
  db.query(
    "SELECT bookingID, SUBSTRING(check_in_date, 1, 10) AS check_in_date, SUBSTRING(check_out_date, 1, 10) AS check_out_date, customerID FROM reservations",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/viewfacilities", (req, res) => {
  db.query(
    "SELECT facilityID, name_of_facility, facility_rate FROM facilities",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/cupdatepass", (req, res) => {
  const password = req.body.password;

  // encrypting this password
  const hashed_password = bcrypt.hashSync(password, saltRounds);

  const custid = req.body.custid;

  db.query("UPDATE customer SET password = (?) WHERE CustomerID = (?)", [
    hashed_password, // replacing password -> hashed_password
    custid,
  ]);
  res.send("success");
});

app.post("/supdatepass", (req, res) => {
  const password = req.body.password;

  // hashing this password
  const hashed_password = bcrypt.hashSync(password, saltRounds);

  const staffid = req.body.staff_id;

  db.query("UPDATE staff SET password = (?) WHERE StaffID = (?)", [
    hashed_password, // replace password with hashed_password
    staffid,
  ]);
  res.send("success");
});

app.post("/updatereservation", (req, res) => {
  const checkin = req.body.checkin;
  const checkout = req.body.checkout;
  const book = req.body.bookingid;
  const custid = req.body.custid;

  db.query(
    "SELECT * FROM reservations WHERE BookingID = (?) and CustomerID = (?)",
    [book, custid],
    (err, result) => {
      if (result.length == 0) {
        res.send("No booking found");
      } else {
        db.query(
          "UPDATE reservations SET check_in_date = (?), check_out_date= (?) WHERE BookingID = (?) and CustomerID = (?)",
          [checkin, checkout, book, custid]
        );
        res.send("success");
      }
    }
  );
});

app.get("/viewbookingid", (req, res) => {
  db.query(
    "SELECT bookingID, SUBSTRING(check_in_date, 1, 10) AS check_in_date, SUBSTRING(check_out_date, 1, 10) AS check_out_date FROM reservations",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(process.env.PORT || 3001);
