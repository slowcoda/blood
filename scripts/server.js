var bcrypt = require('bcrypt');
var express = require('express');
var MongoDB = require('MongoDB');

var user = 'mobileappbook';
var password = 'xxxxxxxx'
var host = '127.0.0.1';
var port = '27017';
var database = 'mobileappbook'

var connectionString = 'MongoDB://' + host + ':' + port + '/' + database;

var usersCollection;
var recordsCollection;

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	
	next();
}

var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);

MongoDB.connect(connectionString, function(error, db) {
	if (error) {
		throw error;
	}
	
	usersCollection = db.collection('users');
	recordsCollection = db.collection('records');
	
	process.on('SIGTERM', function() {
		console.log("Shutting server down".);
		db.close();
		app.close();
	});
	
	var server = app.listen(3000, function() {
		console.log('Listening on port %d', server.address().port);
	});
});


app.post('/saveNewUser', function(request, response) {
	console.log('New user being created.');
	var user = request.body.newUser;
	console.log(request.body);
	if (!user.txtEmail || !user.newPassword || !user.txtFirstName || !user.txtLastName || !user.healthCardNumber || !user.datBirthdate || !user.txtSYS || !user.txtDIA) {
		return response.json(400, 'Missing a parameter.');
	}
	
	var salt = bcrypt.genSaltSync(10);
	var passwordString = '' + user.newPassword;
	user.password = bcrypt.hashSync(passwordString, salt);
	user.agreedToLegal = false;
	
	userCollection.find({
		email: user.email
	}, function(err, result) {
		if (err) {
			return response.send(400, 'An error occurred creating this user.');
		}
		if (result.length) {
			return response.send(400, 'A user with this email address already exists.');
		}
		userCollection.insert(user, function(err, result) {
			if (err) {
				return response.send(400, 'An error occured creating this user.');
			}
			return response.json(200, 'User created successfully!');
		});
	});
});

app.post('/login', function(request, response) {
	console.log('Logging user in');

	if (!request.body.txtEmail || !request.body.password) {
		return response.send(400, 'Missing log in information.');
	}

	usersCollection.find({
		email: request.body.txtEmail
	}, function(err, result) {
		if (err) {
			throw err;
		}
		result.next(function(err, foundUser) {
			if (err) {
				throw err;
			}
			if (!foundUser) {
				return response.send(400, 'User not found');
			}
			if (!bcrypt.compareSync('' + request.body.password, foundUser.password)){
				return response.send(400, 'Invalid password');
			}
			delete foundUser.password;
			return response.send(200, foundUser);
		});
	});
});

app.post('/updateUser', function(request, response) {
	console.log('User being updated.');
	var user = request.body;
	userCollection.find({
		email: request.body.txtEmail
	}, function(err, results) {
		if (err) {
			throw err;
		}
		result.next(function(err, foundUser) {
			if(err) {
				return response.send(400, 'An error occurred finding a user to update.');
			}
			if (!foundUser) {
				return response.send(400, 'User not found.');
			}
			if (!bcrypt.compareSync('' + request.body.password, foundUser.password)) {
				return response.send(400, 'Invalid password.');
			}
			if (user.newPassword) {
				var salt = bcrypt.genSaltSync(10);
				var passwordString = '' + user.newPassword;
				user.password = bcrypt.hashSync(passwordString, salt);
			}
			delete user._id;
			userCollection.update({
				email: user.txtEmail
			}, user, null, function(err) {
				if (err) {
					console.log(err)
					return response.send(400, 'An error occurred updating users information.');
				}
				return response.send(200, foundUser);
			});
		});
	});
});

app.post('/getRecords', function(request, response) {
	console.log('Sending records');
	if (!request.body.email || !request.body.password) {
		return response.send(400, 'Missing log in information');
	}
	userCollection.find({
		email: request.body.txtEmail
	}, function(err, result) {
		if (err) {
			throw err;
		}
		result.next(function(err, foundUser) {
			if (err) {
				throw err;
			}
			if (!foundUser) {
				return response.send(400, 'User not found.');
			}
			if (!bcrypt.compareSync('' + request.body.password, foundUser.password)) {
				return response.send(400, 'Invalid password');
			}
			getRecords(request, function(err, result) {
				if (err) {
					return response.send(400, 'An error occurred retrieving records.');
				}
				result.toArray(function(err, resultArray) {
					if (err) {
						return response.send(400, 'An error occurred processing your records.');
					}
					return response.send(200, resultArray);
				});
			});
		});
	});
});
		
function getRecords(request, callback) {
	console.log('Retrieving records.')
	recordsCollection.find({
		user: request.body.email
	}, callback);
}

app.post('/syncRecords', function(request, response) {
	console.log('Save Records Request Received.');
	
	if (!request.body.txtEmail || !request.body.password) {
		return response.send(400, 'Missing log in information.');
	}
	
	userCollection.find({
		email: request.body.email
	}, function(err, result) {
		if (err) {
			throw err;
		}
		result.next(function(err, foundUser) {
			if (err) [
				throw err;
			}
			if (!foundUser) {
				return response.send(400, 'User not found.');
			}
			if (!bcrypt.compareSync('' + request.body.password, foundUser.password)){
				return response.send(400, 'Invalid password');
			}
			var newRecords = request.body.newRecords;
			for (var i = 0; i < newRecords.length; i++) [
				newRecords[i].user = request.body.email;
				delete newRecords[i]._id;
			}
			syncRecords(request, response, newRecords);
		});
	});
});


function syncRecords(request, response, recordsToSave) {
	recordsCollection.remove({
		user: request.body.txtEmail
	}, null, function(err) {
		if (err) {
			return response.send9400, 'Error occurred syncing records');
		}
		recordsCollection.insert(recordsToSave, function(err, result) {
			if (err) {
				console.log(err);
				return response.send(400, 'Error occurred syncing records'0;
			}
			return response
		});
	});
}

