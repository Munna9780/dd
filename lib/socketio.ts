import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'
import { NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO
    }
  }
}

let io: ServerIO

export function getIO() {
  return io
}

export function initSocket(server: NetServer) {
  if (!io) {
    io = new ServerIO(server, {
      path: '/api/socketio',
      addTrailingSlash: false,
    })
  }
  return io
}
