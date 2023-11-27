const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json()); // mandatory for edit and delete
app.use(bodyParser.urlencoded({ extended: true })); // mandatory for creating account 

const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host               : 'localhost',
    user               : 'root',
    password           : '',
    database           : 'ph_hits',
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database!');
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});


/**
 * For creating an account
 */
app.post('/create-account', (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // data validation to check if the username already exists
    const checkUsernameSql = 'SELECT * FROM users WHERE userName = ?';
    connection.query(checkUsernameSql, [username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('Error checking username availability');
        }

        if (results.length > 0) {
            // If username already exists
            return res.status(409).json({ message: 'Username already exists' });
        }

        // If username does not exist, create a new account
        const sql = 'INSERT INTO users (fName, lName, userName, password, status, role) VALUES (?, ?, ?, ?, "ACTIVE", "Content Manager")';
        connection.query(sql, [firstName, lastName, username, password], (insertErr, result) => {
            if (insertErr) {
                console.error('Error inserting data:', insertErr);
                return res.status(500).json({ message: 'Error creating account' });
            }
            console.log('Account created successfully!');
            res.status(200).json({ message: 'A Content Manager was created successfully' });
        });
    });
});

/**
 * For fetching data to display the existing content manager accounts
 */
app.get('/fetchData', (request, response) => {
    const query = 'SELECT userID AS `ID`, fName AS `First Name`, lName AS `Last Name`, userName AS `Username`, password AS `Password`, status AS `Status` FROM users WHERE role="Content Manager"'; 

    connection.query(query, (dataError, dataResult) => {
        if (dataError) {
            console.error('Error fetching data:', dataError);
            return response.status(500).json({ error: 'Error fetching data' });
        }

        response.json({
            draw: request.query.draw,
            data: dataResult
        });
    });
});


/**
 * For updating account details via edit button
 */
app.post('/update-account', (req, res) => {
    const { userID, firstName, lastName, username, password } = req.body;

    // Creates an object to hold the updated data
    const updatedData = {
        fName: firstName,
        lName: lastName,
        userName: username,
        password: password
    };

    let updateFields = [];
    let fieldValues = [];

    // Iterates through the updated data and construct the update query dynamically
    for (const [key, value] of Object.entries(updatedData)) {
        if (value) {
            updateFields.push(`${key} = ?`);
            fieldValues.push(value);
        }
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Adds the userID at the end for updating a specific user 
    fieldValues.push(userID);

    // Construct the SQL update query based on the fields received and the userID
    let updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE userID = ?`;

    connection.query(updateQuery, fieldValues, (err, result) => {
        if (err) {
            console.error('Error updating account:', err);
            return res.status(500).json({ message: 'Error updating account' });
        }

        // Nagpapakita twice, d ko pa maayos pero working na si edit 
        console.log('Account updated successfully!');
        res.status(200).json({ message: 'Account credentials updated successfully' });
    });
});


/**
 * For deleting an account via delete button
 */
app.delete('/delete-account/:userID', (req, res) => {
    const userID = req.params.userID;

    const deleteQuery = 'DELETE FROM users WHERE userID = ?';

    connection.query(deleteQuery, [userID], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Error deleting user' });
        }

        console.log('Account deleted successfully');
        res.status(200).json({ message: 'Account deleted successfully' });
    });
});


/**
 * For updating account status - disable and disable button
 */
app.put('/update-status/:userID', (req, res) => {
    const userID = req.params.userID;
    const { status } = req.body;

    const updateQuery = 'UPDATE users SET status = ? WHERE userID = ?';

    connection.query(updateQuery, [status, userID], (err, result) => {
        if (err) {
            console.error('Error updating user status:', err);
            return res.status(500).json({ message: 'Error updating user status' });
        }

        console.log('User status updated successfully');
        res.status(200).json({ message: 'User status updated successfully' });
    });
});


// Listen on environment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(express.urlencoded({ extended: true }));