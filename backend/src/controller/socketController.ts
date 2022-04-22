export const socketController = {
    messageCreate: (io: any, socket: any, data: any) => {
        console.log(data);
        // socket.emit('message:get-all', { message: [{ text: data.message }] });
        io.emit('message:get-all', { message: [{ text: data.message }] });
    },
    joinRoom: (io: any, socket: any, data: any) => {
        socket.join(data.id);

        socket.broadcast.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room` });
    },
};
