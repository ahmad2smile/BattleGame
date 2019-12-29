const mysql = require('mysql');
const config = require('./ormconfig.json');

const connection = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
});

connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.database}`,
    (error, results, fields) => {
      if (!error) {
        console.log('It worked.....!');
      }
      // When done with the connection, release it.
      connection.end(connectionEndError => {
        if (connectionEndError) {
          console.log('TCL: connectionEndError', connectionEndError);
        }
      });

      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    },
  );
});
