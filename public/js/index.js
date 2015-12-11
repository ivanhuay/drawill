$(function(){
	//parte del socket
	var url = "http://localhost:3000",
		socket = io(url);

	//control de canvas
	var canvas = document.getElementById('micanvas'),
		ctx = canvas.getContext("2d"),
		$canvas = $(canvas),
		mouse = {active:false};

		
	socket.on("othermousemove",function (start,end){
		ctx.beginPath();
		ctx.moveTo(start.x,start.y);
		ctx.lineTo(end.x,end.y);
		ctx.stroke();
	});


	$canvas.on("mousemove",function (event){
		var x = event.pageX - $canvas.offset().left;
		var y = event.pageY - $canvas.offset().top;
		if(mouse.active){
			
			ctx.beginPath();
			ctx.moveTo(mouse.position.x,mouse.position.y);
			ctx.lineTo(x,y);
			ctx.stroke();

			mouse.position.x = x;
			mouse.position.y = y;

			socket.emit("mousemove",mouse.position);
		}
	});
	$canvas.on("mousedown",function(){
		mouse.active = true;
		var x = event.pageX - $canvas.offset().left;
		var y = event.pageY - $canvas.offset().top;
		mouse.position = {x:x,y:y};
		socket.emit("starton",mouse.position);
	});
	$canvas.on("mouseup",function(){
		mouse.active = false
		socket.emit("endline");
	});




});