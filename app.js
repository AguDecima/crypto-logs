let express = require('express');
let cors = require('cors');
let app = express();
let messageRoute = require('./routes/message.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', messageRoute);

app.listen(process.env.PORT || '3000');