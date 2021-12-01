exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        io.emit('greeting', 'welcome to our site!');

        socket.on('join campaign room',(id)=>{
            socket.join(id);
            console.log("joining the campaign room", id);
        });
        
        socket.on('sending chat msg', (socketObj)=>{
            console.log("cool beans", socketObj);
            const chatObj = {name:socketObj.name, content:socketObj.content}
            io.sockets.in(socketObj.id).emit('chat msg sent',chatObj);
        });
    });
}