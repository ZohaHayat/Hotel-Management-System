/**
 * THIS IS OUR MAIN FILE WHERE ALL SQL QUERIES RELATED TO EVERY USE-CASE
 * WILL BE CATERED.
 * GO THROUGH THIS FILE WITH EXTRA CARE.
 * WHATEVER USE-CASE YOU CODE, MAKE SURE TO CODE A SIMILAR FUNCTION and export it
 * from this file.
 */

const pool = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10; // for password encryption

/**
 * This function takes email, password and name of the user (that are submitted at the frontend)
 * and using an Insert query, seeds them into the database. First, using the bcrypt library, it
 * hashes the password, i.e., encrypts it. All queries are promisified (just as they did in the
 * asssignment 2's code).
 */
const addUserToDatabase = async (email, password, name) => {
  // encrypting the password using bcrypt module
  const salt = await bcrypt.genSalt(saltRounds);
  // encrypting the password using bcrypt
  const hashedPwd = bcrypt.hashSync(password, salt);
  // using a query to insert into the users table
  const query = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`;
  // values that we have to seed
  let values = [name, email, hashedPwd];

  // promisifying the query as it was done in the assignment 2 (seed wali file)
  return new Promise((resolve, reject) => {
    // executing the query
    pool.query(query, values, (error, result) => {
      if (error) {
        // if there is an error, simply reject the promise
        reject(error);
      } else {
        // if the query is successfully executed, resolve the promise
        resolve(result);
      }
    });
  });
};

/**
 * This function fetches the user from the users table given the user_id (which
 * is unique to every user). Again, the query execution is promisified to handle
 * any errors during asynchronous execution. The return value of this function should
 * be a single row since the user_id is unique to every user.
 */
const getUserById = (user_id) => {
  const query = `SELECT * FROM users WHERE user_id=?`;
  let values = [user_id]; // this is the only value that we have to seed

  return new Promise((resolve, reject) => {
    // execute the query
    pool.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        // this means that no user is returned from the database (user does not exist)
        if (result.length === 0) {
          // resolve or return null
          resolve(null);
        }
        // if the length is not 0 (it is 1)
        resolve(result[0]);
      }
    });
  });
};

/**
 * This function fetches the user from the users table given the email (which
 * is unique to every user). Again, the query execution is promisified to handle
 * any errors during asynchronous execution. The return value of this function should
 * be a single row since the email is unique to every user.
 */
const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE user_email = ?`;
  let values = [email];

  return new Promise((resolve, reject) => {
    // executing the query
    pool.query(query, values, (error, result) => {
      // in the event of an error
      if (error) {
        // reject the promise
        reject(error);
      } else {
        // reolve it
        resolve(result);
      }
    });
  });
};

/**
 * This function is invoked in the auth.js (in utilities folder). Two arguments are
 * passed to this function (email and password). We do not have user_id here so
 * we need to fetch the respective user that we want to authenticate here using the
 * email provided. First get the user by getUserByEmail(email) and store the response
 * in the result variable. result is a list. if the length of the list is 0, it means
 * that no user was returned from the database meaning that there isn't a user which such
 * email. In that case, we return null. We have the password as well that the user gives
 * during logIn. Using .compare, we compare the password typed on the login form with
 * the one submitted during signing up.
 * If the passwords match, we return the user. Else, return null.
 */
const authenticateUser = async (email, password) => {
  // get the user by email
  const result = await getUserByEmail(email);

  // if the length of result is 0 -- no user returned
  if (result.length === 0) {
    // return null
    return null;
  }

  // user is stored here
  const returnedUser = result[0];
  // comparing passwords with what we have stored
  const samePassword = await bcrypt.compare(
    password,
    returnedUser.user_password // this is the hashed password stored in the db
  );
  // if the passwords match
  if (samePassword) {
    // return the user from this function
    return returnedUser;
  }
  // else return null
  return null;
};

/**
 * This function takes the user_id and new password entered
 * by the user in the chage change password's form, and using a
 * single SET query, updates the password in the users table.
 */
const updatePassword = async (email, new_password) => {
  // checking if the user exists
  const response = await getUserByEmail(email);
  // this means that the user does not exist
  if (response.length === 0) {
    return null;
  }
  // hashing the new password
  const hash = bcrypt.hashSync(new_password, 10);
  // updating the users table by setting the user_password field equal
  // to the new one
  const query = `UPDATE users SET user_password=? WHERE user_email=?`;
  // seeding the new password and the user_id
  let values = [hash, email];

  // promisifying the query execution to handle errors
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, result) => {
      // if there was an error encountered during query execution
      if (error) {
        // reject the promise
        reject(error);
      } else {
        // resolve it
        resolve(result);
      }
    });
  });
};

const updateAccountInformation = (name, email, password, user_id) => {
  // authenticating the user to check if it exists in the first place
  const response = authenticateUser(email, password);
  // the user doesn't exist
  if (!response) {
    return null;
  }
  // hasing the new password
  const hash = bcrypt.hashSync(password, 10);
  // writing the update query
  const query = `UPDATE users SET user_name=$1, user_email=$2, user_password=$3 WHERE user_id=$4`;
  let values = [name, email, hash, user_id];

  // promisify the query execution
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Given all the column names, this function takes pretty much every attribute
 * of the Staff table as arguments. This is an async operation. First it generates
 * a hashed value of the password provided. Yes, you guessed it right. Promises!
 * The same query-execution syntax is repeated.
 */
const insertStaff = async (
  email,
  fname,
  lname,
  password,
  employee_type,
  salary,
  shift_type
) => {
  // encrypting the password using bcrypt module
  const salt = await bcrypt.genSalt(saltRounds);
  // encrypting the password using bcrypt
  const hash = bcrypt.hashSync(password, salt);
  // insertion query
  const query = `INSERT INTO Staff (Email, FirstName, LastName, Password, Employee_Type, Salary, Shift_type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  // values to insert
  let values = [email, fname, lname, hash, employee_type, salary, shift_type];
  return new Promise((resolve, reject) => {
    // executing the query
    pool.query(query, values, (error, result) => {
      // if there is an error in executing the query
      if (error) {
        // reject the promise
        reject(error);
      } else {
        // resolve the promise (success)
        resolve(result);
      }
    });
  });
};

/**
 * This function takes the email of the staff member as an argument
 * and deletes that record from the Staff table where the Email is equal
 * to the argument passed to the function. Only a single record is deleted
 * since a user cannot create two accounts using the same email id.
 */
const deleteStaff = async (email) => {
  const response = await getUserByEmail(email);
  // this means that the user does not exist
  if (response.length === 0) {
    return null;
  }
  // query to execute
  console.log(email)
  const query = `DELETE FROM users WHERE Email=?`;
  // values to seed
  let values = [email];

  // wrapping the query execution in a promise
  return new Promise((resolve, reject) => {
    // executing the query
    pool.query(query, values, (error, result) => {
      // if there is an error
      if (error) {
        // reject the promise
        reject(error);
      } else {
        // resolve the promise
        resolve(result);
      }
    });
  });
};

// a simple select query does the job here
// pretty self explanatory
const viewInventory = () => {
  const query = `SELECT * FROM Inventory`;

  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// in this function, we must assume that the staff member enters his or her
// StaffID while inserting something into the inventory. this essentially means
// that the html form has a text field StaffID as well.
const insertInventory = async (invName, StaffID, category, quantity, Date) => {
  // generating the date of adding the inventory
  const currentDate = new Date();
  // query to execute -- simple seeding
  const query = `INSERT INTO Inventory (Inventory_item, StaffID, Category, Quantity, Date) VALUES (?, ?, ?, ?, ?)`;
  // values to seed
  let values = [invName, StaffID, category, quantity, currentDate];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * This function takes the inventory name, quantity and staff id as
 * arguments, updates the Inventory table as per these arguments.
 * It also generates the date of when the inventory gets updated.
 * Rest, the query execution is promisified.
 */
const updateInventory = async (invName, quantity, StaffID) => {
  // generating the date of updation
  const currentDate = new Date();
  // query that updates the database
  const query = `UPDATE Inventory SET StaffID=$1, Date=$2, Quantity=$3 WHERE Inventory_item=$4`;
  // values to seed
  let values = [StaffID, currentDate, quantity, invName];

  // wrapping the query execution in a promise
  return new Promise((resolve, reject) => {
    // executing the query
    pool.query(query, values, (error, result) => {
      // if there is an error
      if (error) {
        // reject the promise
        reject(error);
      } else {
        // resolve the promise
        resolve(result);
      }
    });
  });
};

/**
 * As the name implies, this function takes the name of the inventory item
 * as the only argument, and executes the select query accordingly.
 */
const displayInventoryByName = (invName) => {
  // query to execute
  const query = `SELECT * FROM Inventory WHERE Inventory_item=?`;
  // values to seed
  let values = [invName];
  // wrapping the query execution in a promise
  return new Promise((resolve, reject) => {
    // executing the query
    pool.query(query, values, (error, result) => {
      // if there is an error in executing the query
      if (error) {
        // reject the promise
        reject(error);
      } else {
        // resolve the promise
        resolve(result);
      }
    });
  });
};

module.exports = {
  authenticateUser,
  addUserToDatabase,
  getUserByEmail,
  getUserById,
  updatePassword,
  updateAccountInformation,
  insertStaff,
  deleteStaff,
  viewInventory,
  insertInventory,
  updateInventory,
  displayInventoryByName,
};
