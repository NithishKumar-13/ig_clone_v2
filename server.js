require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

const userRoutes = require('./routes/user.routes')
const postsRoutes = require('./routes/posts.routes')
const commentsRoutes = require('./routes/comments.routes')

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use(userRoutes)
app.use(postsRoutes)
app.use(commentsRoutes)


app.listen(PORT, () => console.log(`Server listening to PORT ${PORT}...`))