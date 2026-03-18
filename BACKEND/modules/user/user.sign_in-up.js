const bcrypt = require('bcrypt');
const pool = require('../../config/db');
const {generateandSendOTP} = require('../user/user.generateOTP');


// Sign-up endpoint to handle user registration
// exports.signUp = async (req, res) => {
//     try {
//         const { first_name, last_name, role, email, password } = req.body;
//         // Check if the user already exists
//         const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//         if (existingUser.rows.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // Insert the new user into the database
//         const newUser = await pool.query(
//             'INSERT INTO users (first_name, last_name, role, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//             [first_name, last_name, role, email, hashedPassword]
//         );
//         res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
//     } catch (error) {
//         console.error('Error signing up:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// login endpoint to handle user login
exports.login = async (req, res) => {
    try {
        const {email, uid}= req.user;
        //--------------- OTP HASHING STATION ------------------------------//

       generateandSendOTP(email, uid, res);
       res.status(200).json({message: "ok"});
    
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.resend= async(req, res) => {
    try{
        const {email} = req.body;
         generateandSendOTP(email,  res);
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};