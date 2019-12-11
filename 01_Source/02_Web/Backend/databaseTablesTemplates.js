let tables = ["users"]


let users = `CREATE TABLE IF NOT EXISTS heroku_45e2d6c06603277.users (
    id INT NOT NULL,
    nume VARCHAR(45) NULL,
    prenume VARCHAR(45) NULL,
    cnp VARCHAR(45) NULL,
    voted_events VARCHAR(45) NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX cnp_UNIQUE (cnp ASC)
)`


module.exports =
{
    tables : tables,
    users : users
}