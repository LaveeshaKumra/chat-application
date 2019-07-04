var app=require("express")();
var http=require("http").Server(app);
var io=require('socket.io')(http);

app.get('/',function(req,res){
  res.sendfile('chat.html');
});
  /*The render method works when you have a templating engine, such as Handlebars or Jade, in use.

A templating engine is something that parses a given template file and generates HTML output. This is so you can generate an HTML web page depending on some variables in your program.

Such templates are often used with ExpressJS when writing applications that have a front-end.

The sendfile method, on the other hand, simply sends a given file to the client, regardless of the type and contents of the file.

Since you are using an HTML file, there is nothing particularly to be parsed by the templating engine. So, the output of render is same as that of sendfile (i.e., the HTML written in the file). Hence, both produce the same result.*/


users=[];
io.on("connection",function(socket){
  console.log("A user connected");
  socket.on('setUsername',function(data){
    console.log(data);
    if(users.indexOf(data) > -1) {
           socket.emit('userExists', data + ' username is taken! Try some other username.');
        } 
    else{
      users.push(data);
      socket.emit("userSet",{username:data});
    }
  });
  socket.on('msg',function(data){
    io.sockets.emit('newmsg',data);
  });
});

http.listen(3000,function(){
  console.log("listening at 3000");
})
