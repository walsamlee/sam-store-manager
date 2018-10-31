const users = [
	{
        'id': 1,
        'email': 'admin@store.com',
        'password': 'computer',
        "previllege": 1
    }
];
/**
   * 
   * @returns {} 
*/
const user = (data) => {
	users.push(data);
}

const showUser = () => {
	return users;
}

module.exports = {user, showUser};