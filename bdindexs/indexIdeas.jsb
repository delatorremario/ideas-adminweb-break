
db.ideas.createIndex({
    "opportunity":"text","description":"text",
    "person.lastName":"text",
    "person.firstName":"text", 
    "person.secondName":"text", 
    "person.email":"text", 
    "person.rut": "text"},
    {"name":'search',
    "weights": { "opportunity":1,"description":1, 'person.lastName': 2, 'person.firstName':3, 'person.secondName':4, 'person.email':5, 'person.rut':6 }})
