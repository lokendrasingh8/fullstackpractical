const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/SEC-CB', {
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'xyz@123',
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/SEC-CB' })
}));

const loginRoutes = require('./routes/login');
app.use('/', loginRoutes);
const registerRoutes = require('./routes/register');
app.use('/', registerRoutes);
const logoutRoutes = require('./routes/logout');
app.use('/', logoutRoutes);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

const movieRoutes = require('./routes/movies');
const { log } = require('console');
app.use('/movies', movieRoutes);


app.get('/', (req, res) => {
  res.redirect('/movies');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});