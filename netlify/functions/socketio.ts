import { Handler } from '@netlify/functions'
import { Server } from 'socket.io'

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const io = new Server({
    cors: {
      origin: process.env.URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return {
    statusCode: 200,
    body: 'Socket.IO server running'
  }
}

export { handler }
