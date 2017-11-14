
db.persons.createIndex({"lastName":"text","firstName":"text", "secondName":"text", "email":"text", "rut": "text"},{"weights": { lastName: 1, firstName:2, secondName:3, email:4, rut:5 }})
// db.persons.createIndex({"$**":"text"})