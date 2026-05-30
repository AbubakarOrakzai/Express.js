//
// WHY WE NEED TOKENS & HOW AUTHENTICATION WORKS
// 
// PROBLEM: HTTP is stateless - server doesn't remember users between requests
// SOLUTION: JWT (JSON Web Token) - a signed string proving user authenticated
// 
// HOW JWT WORKS:
// - Contains: Header (algorithm) + Payload (user email/id) + Signature (proof)
// - Secret key stays on server ONLY - NEVER in the token
// - Token stored in cookie/localStorage and sent with every request
// 
// LOGIN FLOW:
// 1. User sends email + password via HTTPS (encrypted channel)
// 2. Server verifies credentials, creates JWT: jwt.sign({ email, id }, "SECRET")
// 3. Server sends JWT to client in cookie: Set-Cookie: token=JWT_STRING
// 4. Browser stores cookie, automatically sends it on future requests
// 5. Server verifies JWT: jwt.verify(token, "SECRET") -> grants access
// 
// PASSWORD TRANSMISSION:
// - Password travels ONLY during login via HTTPS (encrypted)
// - NEVER send password again after login - use token instead
// - Password never stored in JWT or cookie
//

// Example implementation:
const jwt = require('jsonwebtoken');

// LOGIN endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (password === "correct") {
    // Create token (secret stays on server)
    const token = jwt.sign({ email, id: 1 }, "my_secret_key");
    
    // Send token in cookie
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.json({ message: "Logged in!" });
  }
});

// PROTECTED endpoint
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  
  // Verify token using same secret key
  const user = jwt.verify(token, "my_secret_key");
  res.json({ user }); // { email: "user@email.com", id: 1 }
});