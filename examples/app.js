const express = require('express');
const expressSession = require('express-session');
const { faker } = require('@faker-js/faker');
const app = express();
const usersDB = [];

app.use(expressSession({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

function isAuthenticated (req, res, next) {
  if (req.session.userId) {
    return next()
  }

  return res.redirect('/sign-in');
}

/**
 * Create a test user
 */
app.post('/create-user', (req, res) => {
  const user = {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    features: req.body.features
  }

  usersDB.push(user);
  res.json(user);
})

/**
 * Sign in
 */
app.get('/sign-in', (req, res) => {
  res.send(`
    <h1>Sign in</h1>
    <form action="/sign-in" method="POST">
        <input name="email" data-testid="sign-in-email"/>
        <input name="password" data-testid="sign-in-password" type="password"/>
        <button type="submit" data-testid="sign-in-submit">sign in</button>
    </form>
  `)
})

/**
 * Sign in request
 */
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const user = usersDB.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.redirect('/sign-in');
  }
  
  req.session.regenerate(function (err) {
    if (err) next(err)
    
    req.session.userId = user.userId
    res.redirect('/');
  })
});

/**
 * Authenticated page
 */
app.get('/', isAuthenticated, (req, res) => {
  const user = usersDB.find(user => user.userId === req.session.userId);

  res.send(`
    <h1 data-testid="home-title">Hello ${user.username} 👋</h1>
    <a href="/settings">Settings</a>
  `)
})

/**
 * Settings page
 */
app.get('/settings', isAuthenticated, (req, res) => {
  const user = usersDB.find(user => user.userId === req.session.userId);

  res.send(`
    <h1>Settings</h1>
    <h2>Features</h2>
    <ul>
        ${ user.features.map(feature => `<li data-testid="settings-feature">${feature}</li>`).join('\n') }
    </ul>
  `)
})

app.listen(3000);
console.log("Server listening on port 3000");
