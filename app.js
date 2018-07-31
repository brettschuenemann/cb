var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
app.use(express.static('views/assets'));
 
var request = require('request');

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

//REMOVE: hack for PW staging environment
router.get("/sidebar",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/2",function(req,res){
  res.sendFile(path + "index2.html");
});

router.get("/cbinfo",function(req,res){
	var companyName = req.query.name;
	console.log('COMPANY NAME: ' + companyName);

	var urlToSearch = 'https://api.crunchbase.com/v3.1/odm-organizations?user_key=09bbd7096498c9dca036d0f6f07ee420' + '&domain_name=' + companyName; 
	console.log('URL TO SEARCH: ' + urlToSearch);

	var options = { method: 'GET',
  		url: urlToSearch
	};

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  if(body) {
			console.log("debugresult");
			console.log(body);

			res.send(body);

		} else {
			res.send(body);
		}

	});  
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
  console.log('Failed Request Made for: ' + req.baseUrl);
});

app.listen(8080,function(){
  console.log("Live at Port 8080");
});
