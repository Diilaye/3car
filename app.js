

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const db = require('./configs/db');

const app = express();


require('dotenv').config({
    path: './.env'
});

app.use(cors());

app.use(bodyParser.json({
    limit: '10000mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10000mb'
}));

const garantiRoute = require('./routes/garanti');
const assuranceRoute = require('./routes/assurance');
const voyageRoute = require('./routes/voyage');

app.use('/v1/api/garantis', garantiRoute);
app.use('/v1/api/assurances', assuranceRoute);
app.use('/v1/api/voyages', voyageRoute);

app.use(express.static(__dirname + '/web/'));

app.get('/', (req, res) => res.sendFile(path.resolve('web/index.html')));


db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(process.env.MONGO_RUI);
        console.log(`Server started on ${port}`);
    });
});