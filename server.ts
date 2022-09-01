
// server.js
import app = from('express')()
import server = require('http').Server(app)
import io = require('socket.io')(server, {
  cors:{
    origin: "*"
  }
})
import next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

io.on('connection', socket => {

  socket.on('message', (data) => {
    socket.broadcast.emit('message:received', data)
  })

  socket.on('count', (data) =>{
    socket.broadcast.emit('count:received', data)
  })
})




nextApp.prepare().then(() => {
  
  app.get('/messages', (req, res) => {
    
    res.json(messages)
  })

  app.get('*', (req, res) => {
    
    return nextHandler(req, res)
  })

  server.listen(3000, (err) => {
    if (err){ 
      process.exit(0)
      console.log('error')
    }
    console.log('> Ready on http://localhost:3000')
  })
})