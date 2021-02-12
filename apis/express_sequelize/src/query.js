const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database: 'nur_ubicaciones',
    password: 'el22mer10@',
    port: 5432,
})

const getDonadores = (request, response) => {
    pool.query('SELECT * FROM donadores ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

const postDonadores = (request, response) => {
    const { name, longitude, latitude } = request.body

    pool.query('INSERT INTO donadores ( name, latitude, longitude ) VALUES ($1, $2, $3)', [name, latitude, longitude], (error, results) => {
        if (error) {
            throw error 
        }
        response.status(201).send( `Donador added with ID: ${results.id}` )
    })
}

module.exports = {
    getDonadores,
    postDonadores,
}