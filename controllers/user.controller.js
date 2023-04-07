

const fs = require('fs');


const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8'));

const getAllUsers = (req, res) => {
    res.json({users: users})
}
  
  const getUserByEmail = (req, res) => {
    const email = req.params.email;
    const result = users.filter((userObj) => userObj.email == email)
    res.json({result});
  }
  
  const deleteUser = (req, res) => {
    const email = req.params.email;
    for(let i = 0; i < users.length; i++){
      if(users[i].email == email){
        users.splice(i, 1);
      }
    }
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), err => {
      if(err) return console.log('Error while deleting user');
      res.json({
        message: "User deleted Successfully"
      });
    })
  }

  module.exports = {
    getAllUsers,
    getUserByEmail,
    deleteUser
  }
  