mongodb
username - galleria
password- 093V7gmcWmkZo9Tg


Running -> GET -> http://localhost:5000 => HELLO WORLD
Uploading art -> POST -> http://localhost:5000/upload-art => JSON file to mongo db
Updating Art -> PATCH -> http://localhost:5000/art/65539fb733e7b3f3f8c14e7f => update any field
Deleting Art -> http://localhost:5000/art/65539fb733e7b3f3f8c14e7f => delete art



SEE JSON FILE - http://localhost:5000/all-arts

FINDING QUERIES -> http://localhost:5000/all-arts?category=Flower



clinet -> npm run dev

server -> npm start