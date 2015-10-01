 var sqlite3 = require('sqlite3').verbose();
 var db = new sqlite3.Database('./ssnoc.db');
 
 exports.validUser = function (username) {
				var count = 0;
			 db.get("SELECT * from user where username=$username", {$username: username}, function(err, row){
			 	if(err){
			 		console.log("error!" + err);
			 	}
			 	else if(row == undefined){
			 		console.log("not found...");
			 	}
			 	else {
			 		console.log("reached....");
			 		count++;

			 	}
			 	return count;
			 });
			 
		
};

db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS user (username TEXT PRIMARY KEY, password TEXT, firstname TEXT, lastname TEXT, location TEXT, isadmin INTEGER)");
	
});

exports.insertUser = function(username, password, firstname, lastname, location, isadmin) {

			db.serialize(function(){	
			var stmt = db.prepare("INSERT INTO user (username, password, firstname, lastname, location, isadmin) VALUES (?,?,?,?,?,?)");
			stmt.run(username, password, firstname, lastname, location, isadmin);
			stmt.finalize();
		});

			db.each("SELECT username FROM user", function(err,row){
	 		console.log("entry: " + row.username);
		});
};


