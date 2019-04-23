const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

console.log(input);

function lookupPerson(name) {
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...");
    console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
    result.rows.forEach((row) => {
      console.log(`- ${row.id -= 2}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().slice(0, 10)}'`);
    })
    client.end();
  });
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  lookupPerson(input);
});