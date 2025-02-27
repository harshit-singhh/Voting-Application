const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/GlobalErrorHandlers");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const { jwtAuthMiddleware } = require("./jwt");
const votingRoute = require("./routes/votingRoute")

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/user", userRoutes);
// hum candidates wali api call me yha se hi authentication mandatory
// kar rhe he because..ye wala route hum chahte whi access kar pae
// jo authenticated ho, mtlb jiska pehle se database me data ho (admin)
app.use("/candidate", jwtAuthMiddleware, candidateRoutes);

// we could have also done this in candidate route, but because
// i wanted to pass the authentication from here, and for voting routes
//   we dont need authentication in all routes..therefore i made another
//   voting route
app.use("/vote", votingRoute);

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.underline);
});
