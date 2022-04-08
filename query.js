const { User, sequelize } = require('./models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function stringify(data) {
  console.log(JSON.stringify(data, null, 2))
}

const findAllUsers = async () => {
//   // Find all users
//   // Raw SQL: SELECT * FROM users;
   const users = await User.findAll()
   stringify(users)
    console.log(users)
}

const createNewUser = async () => {
// //   // Create a new user
  // Raw SQL: INSERT INTO users (id, firstName, lastName, email, userName, password, jobTitle) VALUES (DEFAULT, 'Jane', 'Doe', 'jane@jane.com', 'janedoe', '123456789', 'Systems Analyst')
  const newUser = await User.create({
    firstName: 'GJ', lastName: 'Haaland', email: 'GJlandhaa@gmail.com', username: 'gjlandhaa', password: '123345', jobTitle: 'Boss'
    })
    console.log(newUser)
    /// gets all the emails from just john //////
    // const findAllEmails = await User.findAll({where:{firstName:'John'},attributes:['email']})
}

const deleteWhere = async () => {
  // Delete everyone named "Jane"
   const users = await User.destroy(
    {where: {name: 'Jane'}}
   )
//   // Raw SQL: DELETE FROM users WHERE firstName = 'Jane'
}

const updateUser = async () => {
//   // Change lastname "Doe" to "Smith"
  const updateUser = await User.update(
    {lastName: "Smith"},
    {where: {lastName: 'Doe'}}
  )
}
  // UPDATE users SET lastName='Smith' WHERE lastName = 'Doe'


const findUsersOnlyEmail = async () => {
  // Find all users and only show their email
  const users = await User.findAll({attributes: ['email']})
  console.log(users)
  
  // Raw SQL: SELECT email FROM users;
}

const findAllJohns = async () => {
  // Find all users where firstname is John
  const users = await User.findAll(
    {where: {firstName: 'John'}}
  )
  // Raw SQL: SELECT * FROM users WHERE firstName = "John";
}

const findJohnOrJane = async () => {
  // Find all users where firstname is either John or Jane
  const users = await User.findAll(
    {where: {
      [Op.or]: [
      {firstName: 'John'},
      {firstName: 'Jane'}
      ]
    }
    // {where: {firstName: 'John'} || {firstName:'Cook'}}
  });
  // Raw SQL: SELECT * FROM users WHERE firstName = "John" OR firstName = "Jane";
}

// {where: {firstName: 'John'} || {firstName:'Cook'}}

const run = async () => {
  try {
    await findAllUsers()
    await createNewUser()
    await updateUser()
    await findUsersOnlyEmail()
    await findAllJohns()
    await findJohnOrJane()
    await deleteWhere()
  } catch (error) {
  } finally {
    await sequelize.close()
  }
}

run()
