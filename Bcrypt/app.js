// ======================= Bcrypt in Node.js =======================

// Bcrypt is a library used in Node.js to securely hash passwords
// before storing them in a database. It is commonly used in
// authentication systems to protect user passwords from hackers.

// Instead of storing the original password directly in the database,
// bcrypt converts the password into a hashed format.
// This process is called hashing.

// Hashing is a one-way process, meaning the original password
// cannot be converted back from the hash.

// Example:
// Original Password:
// abubakar123

// Hashed Password Example:
// $2b$10$zYv9Kfksjshd83jd...

// This hashed value is stored in the database instead of
// the real password.

// ================================================================
// Installation
// ================================================================

// npm install bcrypt

// Import bcrypt

const bcrypt = require('bcrypt');

// ================================================================
// Hashing Password
// ================================================================

// The bcrypt.hash() function is used to hash a password.

// Syntax:
// bcrypt.hash(password, saltRounds, callback)

// password     -> original password
// saltRounds   -> number of processing rounds
// callback     -> function returning hash

// Salt rounds determine how many times bcrypt processes
// the password internally.

// Higher salt rounds:
// - increase security
// - make hashing slower

// Usually 10 or 12 salt rounds are commonly used.

const password = "abubakar123";

bcrypt.hash(password, 10, function(err, hash){

    console.log("Generated Hash:");
    console.log(hash);

});

// ================================================================
// Important Point
// ================================================================

// Even if the same password is hashed multiple times,
// bcrypt generates different hashes because it automatically
// adds a random salt value.

// This makes password cracking very difficult.

// ================================================================
// Comparing Password During Login
// ================================================================

// During login, bcrypt does not decrypt the hash because
// hashing is irreversible.

// Instead, bcrypt compares the entered password with
// the stored hash using bcrypt.compare().

// Syntax:
// bcrypt.compare(enteredPassword, storedHash, callback)

bcrypt.hash(password, 10, function(err, hash){

    bcrypt.compare("abubakar123", hash, function(err, result){

        console.log(result);

    });

});

// If passwords match:
// true

// If passwords do not match:
// false

// ================================================================
// Complete Example
// ================================================================

const userPassword = "abubakar123";

bcrypt.hash(userPassword, 10, function(err, hash){

    console.log("Hash:", hash);

    bcrypt.compare("abubakar123", hash, function(err, result){

        console.log("Password Match:", result);

    });

});

// ================================================================
// Authentication Flow
// ================================================================

// Signup Process:
// User Password --> bcrypt.hash() --> Store Hash in Database

// Login Process:
// Entered Password --> bcrypt.compare() --> true/false

// ================================================================
// Why Bcrypt is Secure
// ================================================================

// Bcrypt automatically:
// - generates salt
// - combines password with salt
// - hashes securely
// - protects against rainbow table attacks

// ================================================================
// Difference Between Encryption and Hashing
// ================================================================

// Encryption:
// - two-way process
// - can be decrypted back

// Hashing:
// - one-way process
// - cannot be reversed

// Encryption is used for securing general data.
// Hashing is mainly used for password security.