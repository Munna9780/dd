import { NextRequest } from 'next/server'
import { initSocket } from '@/lib/socketio'

export async function GET(req: NextRequest) {
  try {
    const io = initSocket(req.socket.server)
    
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)
      
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })

    return new Response('Socket.IO server initialized', { status: 200 })
  } catch (error) {
    console.error('Socket.IO initialization error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
