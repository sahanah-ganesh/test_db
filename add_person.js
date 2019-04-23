const settings = require('./settings'); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const bday = process.argv[4];

// console.log('first ', firstName, 'last ', lastName, 'birth ', bday);

function insertPerson(first_name, last_name, birthdate) {
  knex('famous_people')
    .insert([{first_name, last_name, birthdate}])
    .then(() => console.log('data inserted'))
    .catch((err) => { console.log(err); throw err})
};

insertPerson(firstName, lastName, bday);

