let tables = ["users"]


let users = `create table if not exists users(
    id int primary key auto_increment,
    email varchar(255)not null,
    password varchar(255)not null,
    age varchar(255)not null
)`;


module.exports =
{
    tables : tables,
    users : users
}