var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('mentormatchsampledata.json', 'utf8'));
allMovies.forEach(function(user) {
	console.log(user)
    var params = {
        TableName: "MentorMatch2",
        Item: {
            userId:  user.userId,
            email: user.email,
			familyName:  user.familyName,
			givenName: user.givenName,
			skills: user.skills
			
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add user", user.userId, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.email);
       }
    });
});