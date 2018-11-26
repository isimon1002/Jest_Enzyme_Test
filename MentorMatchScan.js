var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "MentorMatch2",
    ProjectionExpression: "userId, email, familyName, givenName, skill",
    // FilterExpression: "#userId = :idd",
    // ExpressionAttributeNames: {
    //     "#userId": "userId",
    // },
    // ExpressionAttributeValues: {
	// 	":idd":"100318851014008686554"
    // }
};

console.log("Scanning Users table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(user) {
           console.log(
            data)
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}