var express = require("express"),
	path = require("path"),
	app = express(),
	io = require("socket.io");

//configure app
app.use(express.static(path.join(__dirname,'public')));
app.use('/bower_components',express.static(__dirname+'/bower_components'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs');

app.get("/",function (req,res){
	res.render("index.ejs");
});

var server = app.listen(3000,function(){
	var host = server.address().address,
		port = server.address().port;
	console.log("Server listening at http://%s:%s",host,port);

});
//socket y logica detras del juego

io = io(server);
var allLines = {};//esto es el juego completo

io.on("connection",function (socket){
	var socketID = socket.id;
	console.log("connected --> id:"+socketID);
	allLines[socketID] = {lines:[[{x:0,y:0}]]};//cargo una posicion inicial
	socket.on("starton",function (position){

		console.log("starton: "+socket.id);
		
		var lineas = allLines[socketID].lines.length,
			ultimaLinea = lineas - 1,
			puntos = allLines[socketID].lines[ultimaLinea].length;
		
		if(puntos > 1){
		
			allLines[socketID].lines[ultimaLinea][0] = position;//reemplazo el punto de inicio
		}else{
		
			allLines[socketID].lines.push([position]);
		}

	});

	socket.on("mousemove",function (position){
		var lineas = allLines[socketID].lines.length,
			ultimaLinea = lineas - 1,
			puntos = allLines[socketID].lines[ultimaLinea].length,
			lastpoint = allLines[socketID].lines[ultimaLinea][puntos-1];

		allLines[socketID].lines[ultimaLinea].push(position);
		if(lastpoint!=position){
			console.log("lastpoint: "+ JSON.stringify(lastpoint));
			console.log("point: "+ JSON.stringify(lastpoint));
			
		}
		socket.broadcast.emit("othermousemove",lastpoint,position);
	});

});