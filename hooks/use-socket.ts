import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocket() {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Initialize socket connection
    const socketUrl = process.env.NODE_ENV === 'production'
      ? '/.netlify/functions/socketio'
      : '/api/socketio'

    socketRef.current = io(socketUrl, {
      path: process.env.NODE_ENV === 'production' ? undefined : '/api/socketio',
      addTrailingSlash: false
    })

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  return socketRef.current
}
