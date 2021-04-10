const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const corsOptions = {
  origin: "https://madd-App-master.herokuapp.com/",
  optionsSuccessStatus: 200
};

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User = require('./models/user');
require('dotenv').config();

// /************************************************************************************************************/
// const mongo = require('mongodb').MongoClient; //NOTE
// const client = require('socket.io').listen(process.env.PORT || 4000).sockets; //NOTE

// // Connect to mongo
// // mongo.connect('mongodb://205.185.110.71/mongochat', function(err, db) {
// mongo.connect(process.env.MONGOCHAT_URL, function(err, db) {
//   if(err) {
//     throw err;
//   }

//   console.log('MongoDB connect....')

//   // Connect to Socket.io
//   client.on('connection', function(socket) {
//     let chat = db.collection('chats');

//     // Create function to send status
//     sendStatus = function(s) {
//       socket.emit('status', s);
//     }

//     // Get chats from mongo collection
//     chat.find().limit(100).sort({_id:1}).toArray(function(err, res) {
//       if(err) {
//         throw err;
//       }

//       // Emit the messages
//       socket.emit('output', res);
//     });

//     // Handle input events
//     socket.on('input', function(data) {
//       let m_name = data.name;
//       let m_message = data.message;

//       // Check for name and message
//       if(m_name == '' || m_message == '') {
//         // Send error status
//         sendStatus('Please enter a name and message');
//       } else {
//         // Insert message
//         chat.insert({name: m_name, message: m_message}, function() {
//           client.emit('output', [data]);

//           // Send status object
//           sendStatus({
//             message: 'Message sent',
//             clear: true
//           });
//         });
//       }
//     });

//     // Handle clear
//     socket.on('clear', function(data) {
//       // Remove all chat from the collection
//       chat.remove({}, function() {
//         // Emit cleared
//         socket.emit('cleared');
//       });
//     });
//   });
// });

//  /***********************************************************************************************************/

const MONGODB_URL = process.env.MONGODB_URL;
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});
const csrfProtection = csrf();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000 // So we can run on heroku || (OR) localhost:3000

// const io = require('socket.io')() // For live chat on index page

const app = express();

// Route setup. You can implement more in the future!
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false })) // For parsing the body of a POST
  .use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  )
  .use(csrfProtection)
  .use(flash())

  .use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    res.locals.csrfToken = req.csrfToken();
    next();
  })

  .use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  })

  .use('/', routes);

mongoose
  .connect(MONGODB_URL, options)
  .then(result => {
    console.log("listening on port 3000");
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });



// const chatUsers = {}

// io.on('connection', socket => {
//   socket.on('new-user', name => {
//     chatUsers[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//   })
//   socket.on('send-chat-message', message => {
//     socket.broadcast.emit('chat-message', { message: message, name: chatUsers[socket.id] })
//   })
//   socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', chatUsers[socket.id])
//     delete chatUsers[socket.id]
//   })
// })