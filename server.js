var express = require("express"),
	app = express();

//configure app
app.use(express.static(path.join(__dirname,'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs');

app.get("/",function (req,res){
	res.render("index");
});

var server = app.listen(3000,function(){
	var host = server.address().address,
		port = server.address().port;
	console.log("Server listening at http://%s:%s",host,port);

});
