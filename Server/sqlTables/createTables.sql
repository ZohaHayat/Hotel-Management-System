CREATE TABLE hotel_management.Hotel_Revenue
    (Date Date, BookingID varchar(45), Total_Revenue varchar(45), Primary key (Date));

CREATE TABLE hotel_management.Customer
    (CustomerID varchar(45), Email varchar(45), FirstName varchar(45), LastName varchar(45), Password varchar (45), Payments_Due varchar(45), Primary key (CustomerID));

CREATE TABLE hotel_management.Staff 
    (StaffID varchar(45), Email varchar(45), FirstName varchar(45), LastName varchar(45), Password varchar (45), Employee_Type varchar(45), Salary varchar(45), Shift_type varchar(45), Primary key(StaffID));

CREATE TABLE hotel_management.Reservations 
    (BookingID varchar(45), Room_number varchar(45), CustomerID varchar(45), Booking_Date Date, Check_in_Date Date, Check_out_Date Date, Primary key (BookingID));

CREATE TABLE hotel_management.Hotel_Rooms
    (Room_number varchar(45), Type_of_Room varchar(45), Status varchar(45), Primary key(Room_number));

CREATE TABLE hotel_management.Room_Rates
    (Type_of_Room varchar(45), Room_rate varchar(45) Primary key (Type_of_Room));

CREATE TABLE hotel_management.Shifts
    (Shift_type varchar(45), Time Time, Primary key (Shift_type));

CREATE TABLE hotel_management.Facilities_Availed 
    (BookingID varchar(45), Room_number varchar(45), Date Date, Time Time, FacilityID varchar (45), Quantity varchar(45), Primary key(BookingID, Room_number, Date, Time));    

CREATE TABLE hotel_management.Facilities 
    (FacilityID varchar(45), Name_of_facility varchar(45), Facility_Rate varchar(45), Primary key (FacilityID)); 

CREATE TABLE hotel_management.Inventory
    (Inventory_item varchar(45), StaffID varchar(45), Category varchar(45), Quantity varchar(45), Date Date , Primary key(Inventory_item)); 