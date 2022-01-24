const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

global.TaskTracker = require('./api/models/trackerModel');
const routes = require('./api/routes/trackerRoutes');

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb+srv://tracker:tracker123@cluster0.ucbiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {useNewUrlParser: true}
);


const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);
app.listen(port);

//404
app.use((req, res) => {
  res.status(404).send({url: `${req.originalUrl} not found`});
})

console.log(`Server started on http://localhost:${port}`);
