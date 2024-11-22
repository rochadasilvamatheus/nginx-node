const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database.');
    }
  });

const sqlInsert = `INSERT INTO people(name) values('Matheus'), ('Thiago'), ('Claudio'), ('Alice');`;

connection.query(sqlInsert, (err, result) => {
    if (err) {
        console.error("Error inserting data:", err);
    } else {
        console.log("Data inserted successfully.");
    }
});

const getNames = () => {
    return new Promise((resolve, reject) => {
        const sqlSelect = "SELECT * FROM people";
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
            } else {
                console.log("Query successful, results:", results);
                const names = results.map(person => person.name);
                resolve(names);
            }
        });
    });
};


app.get('/', async (req, res) => {
    try {
        const names = await getNames();
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <p>Lista de nomes cadastrados no banco de dados:</p>
            <ul>
                ${names.map(name => `<li>${name}</li>`).join('')}
            </ul>
        `);
    } catch (err) {
        console.error("Error fetching names:", err);
        res.status(500).send('Error fetching names');
    }
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})

process.on('SIGINT', () => {
    connection.end(err => {
        if (err) {
            console.error('Error while closing the connection:', err);
        } else {
            console.log('MySQL connection closed.');
        }
        process.exit();
    });
});