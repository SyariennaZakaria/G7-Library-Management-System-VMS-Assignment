const MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');

const User = require('./user');

//require('dotenv').config()
const mongoPath = process.env.MONGOPATH

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ugdgl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	//mongoPath,
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', bodyParser.text(), async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);
	if (user=="username is invalid"||user=="password is invalid"){
		return res.status(404).send("invalid input")
	}
	
	return res.status(200).send("login success")

})


app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password);
	if(user=="username exits"){
		return res.status(404).send("username exists")
	}
	return res.status(200).send("Create new account")

})
app.patch('/update', async (req, res) => {
	console.log(req.body);
	const user = await User.update(req.body.username);
	if(user=="username incorrect"){
		return res.status(404).send("username fail")
	}
	return res.status(200).send("Successfully updated")

})
app.delete('/delete', async (req, res) => {
	console.log(req.body);
	const user = await User.update(req.body.username,req.body.password);
	if (user=="password is invalid"||user=="username is invalid"){
		return res.status(404).send("delete failed")
	}
	
	return res.status(200).send("successfully delete")

})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})