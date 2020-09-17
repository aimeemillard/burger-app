var mysql = require("mysql");
var connection;

// var connection = mysql.createConnection({});

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "d1kb8x1fu8rhcnej.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "oeon6mulqz1xuhjx",
    password: "l75zvg4lw9nxvla4",
    database: "o9dy3g1mjocmu0s2",
  });
}

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
