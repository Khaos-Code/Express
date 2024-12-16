const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Custom middleware to check working hours
const checkWorkingHours = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  // Check if the request is made during working hours (Monday to Friday, 9 AM - 5 PM)
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    return next(); // Continue to the requested page
  } else {
    return res.status(403).send('The application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Use the middleware globally
app.use(checkWorkingHours);

// Set up static file serving (for CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route for Home page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" type="text/css" href="styles.css"></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <h1>Welcome to the Home Page</h1>
        <p>Lorem20</p>
      </body>
    </html>
  `);
});

// Route for Our Services page
app.get('/services', (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" type="text/css" href="styles.css"></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <h1>Our Services</h1>
        <p>We offer great services!</p>
      </body>
    </html>
  `);
});

// Route for Contact Us page
app.get('/contact', (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" type="text/css" href="styles.css"></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <h1>Contact Us</h1>
        <p>Feel free to contact us at contact@ourservice.com.</p>
      </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
