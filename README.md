# uweast-ck
Community Kitchens website for United Women of East Africa - Support Team

# Prerequisites
1. Install MongoDB server.
2. Install MongoDB Compass to visually see database.
3. Set up a database called uweastdb in Mongo.

# To Develop

1. Pull the repo.
2. Create a .env file in the root level of the repo with the following line:
  - MONGODB_URI=mongodb://localhost:27017/uweastdb/
  - the part after the localhose and port may depend on what you name the database when setting it up.
3. Run `npm install`.
4. Run `npm start` to begin the service.
5. Start the MongoDB server on your computer.
6. You can now visit the corresponding localhost and interact with the site.
