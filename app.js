let express = require('express');
let cors = require('cors');
let morgan = require('morgan');
let logger = require('./utils/logger.utils');
let app = express();
let messageRoute = require('./routes/message.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined", { "stream": logger.stream }));

app.use('/api/v1', messageRoute);

app.listen(process.env.PORT || '3000', () => {
    logger.info(`running on http://localhost${process.env.PORT || 3000}`);
});