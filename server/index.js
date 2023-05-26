require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')

const corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
      path: "/",
    }

}));

// app.use((req, res, next) => {
//    console.log(req.session);
//    next();
// });

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/student', require('./routes/studentRoutes'))
app.use('/api/employee', require('./routes/employeeRoutes'))
app.use('/dashboard', require('./routes/dependentRoutes'))
app.use('/api/insurance', require('./routes/insuranceRoutes'))
app.use('/api/medical', require('./routes/medicalRoutes'))
app.use('/api/doctor', require('./routes/doctorRoutes'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})