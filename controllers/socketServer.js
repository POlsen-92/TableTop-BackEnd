exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        io.emit('greeting', 'welcome to our site!');

        socket.on('join campaign room',(id)=>{
            socket.join(id);
            console.log("joining the campaign room", id);
        });
        
        socket.on('msg sending', (socketObj)=>{
            console.log("cool beans", socketObj);
            const chatObj = {user:socketObj.user, content:socketObj.content}
            socket.to(socketObj.id).emit('msg delivering',chatObj);
        });
    });
}