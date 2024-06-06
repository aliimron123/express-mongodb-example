const monggose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
monggose.connect(DB).then(() => {
    console.log('db connected');
});

//  Server Start
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('welcome');
});

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log('uncaughtException');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
