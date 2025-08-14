import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';


// Minimal Socket.IO setup: private rooms named by sorted pair of userIds
export function initSocket(server: HttpServer) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket: Socket) => {
    console.log('socket connected', socket.id);

    socket.on('join:thread', ({ threadId }) => {
      socket.join(threadId);
    });

    socket.on('message:send', async (payload) => {
      // payload { threadId, from, to, content }
      // Persist message if you implement Message model
      io.to(payload.threadId).emit('message:receive', payload);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
    });
  });

  return io;
}
