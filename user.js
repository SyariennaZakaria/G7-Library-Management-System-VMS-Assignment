const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs")
let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("library-system").collection("users")
	}

	static async register(user_name, id_membership, email) {
		// TODO: Check if username exists
		return users.findOne({ 'username': user_name }).then(async user => {
			if (user){
				return "user existed"
			}
			else{
				//TODO: Hash password
				const passwordHash = bcrypt.hashSync(id_membership, 10);
				await users.insertOne({
					"username": user_name,
					"password": passwordHash,
					"email": email
				})
				return "user created"
			}
		})
	}

	static async login(user_name, id_membership, email) {
		// TODO: Check if username exists
		return users.findOne({
			'username': user_name,
		}).then(async user => {
			// TODO: Validate password
			if (user) {
				const check = await bcryptjs.compare(id_membership,user.password)
				if(check==true){
					return "Welcome to the library portal"
				}
				else{
					return "invalid password"
				}
			}
			else
				return "invalid username";
		})
	}
}
module.exports = User;