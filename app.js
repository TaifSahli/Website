const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const i18n = require('i18n-express');
const bodyParser = require('body-parser');
const pageRouter = require('./routes/routes');

dotenv.config({ path: "./config.env" });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());
app.use(express.json());
app.use(cookieParser());
app.use(expressLayouts);
app.use(flash());
const cors = require('cors');

const corsOptions = {
    origin: '*', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(session({ 
    resave: false, 
    saveUninitialized: true, 
    secret: 'nodedemo', 
    cookie: { secure: false } // Set to true if using HTTPS
}));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/node_modules"));

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});


const DB = process.env.DATABASE_URL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connection successful!"));



pageRouter(app);

app.all("*", (req, res) => {
    res.locals = { title: "Error 404", HeaderCss: '', FooterJs: '' };
    res.render("auth/auth-404", { layout: "layouts/layout-without-nav" });
});

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));


