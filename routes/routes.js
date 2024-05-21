const express = require('express');
const route = express.Router();
const AuthController = require("../controllers/AuthController");
const ContactController = require("../controllers/ContactController");
const BagController = require("../controllers/BagController");

module.exports = function (app) {
    app.use((req, res, next) => {
        const uemail = req.session.useremail;
        const allowedPublicUrls = ["/index", "/services", "/about", "/login", "/auth-validate", "/register", "/signup", "/resetpassword", "/error"];
        const allowedAuthenticatedUrls = [...allowedPublicUrls];
      
      
      
        if (allowedPublicUrls.indexOf(req.path) !== -1) {
          return next();
        } else if (uemail) {
          return next();
        } else {
          return res.redirect('/index'); 
        }
      });
      
      

    app.get('/auth-404-alt', (req, res) => {
        res.render('auth-404-alt', { title: '404 Error', layout: 'layouts/layout-without-nav' });
    });

    app.get('/auth-500', (req, res) => {
        res.render('auth-500', { title: '500 Error', layout: 'layouts/layout-without-nav' });
    });

    app.get('/', (req, res) => {
        const isAuth = req.session.useremail;
        res.render('index', { title: 'الرئيسة', page_title: 'الرئيسة', currentRoute: 'index', layout: 'layouts/layout-without-nav', isAuth });
    });

    app.get('/index', (req, res) => {
        const isAuth = req.session.useremail;
        res.render('index', { title: 'الرئيسة', page_title: 'الرئيسة', currentRoute: 'index', layout: 'layouts/layout-without-nav', isAuth });
    });

    app.get('/services', (req, res) => {
        const isAuth = req.session.useremail;
        res.render('services', { title: 'الخدمات', page_title: 'الخدمات', currentRoute: 'services', layout: 'layouts/layout-without-nav', isAuth });
    });

    app.get('/about', (req, res) => {
        const isAuth = req.session.useremail;
        res.render('about', { title: 'حولنا', page_title: 'حولنا', currentRoute: 'about', layout: 'layouts/layout-without-nav', isAuth });
    });

    app.get('/blog', (req, res) => {
        const isAuth = req.session.useremail;
        res.render('blog', { title: 'الباقات', page_title: 'الباقات', currentRoute: 'blog', layout: 'layouts/layout-without-nav', isAuth, success_msg: req.flash('message'), error_msg: req.flash('error') });
    });

    app.get('/contact', (req, res) => {
        const isAuth = req.session.useremail;
        res.render('contact', {
            title: 'تواصل معنا',
            page_title: 'تواصل معنا',
            currentRoute: 'contact',
            layout: 'layouts/layout-without-nav',
            isAuth,
            success_msg: req.flash('message'),
            error_msg: req.flash('error')
        });
    });

    app.post('/sava-contact', ContactController.createContact);

    app.get('/login', (req, res) => {
        res.render('auth/login', { title: 'Login', layout: 'layouts/layout-auth', 'message': req.flash('message'), error: req.flash('error') });
    });

    app.post('/auth-validate', AuthController.validate);

    app.get('/logout', AuthController.logout);

    app.get('/register', (req, res) => {
        res.render('auth/register', { title: 'Register', layout: 'layouts/layout-auth', message: req.flash('message'), error: req.flash('error') });
    });

    app.post('/signup', AuthController.signup);

    app.get('/forgotpassword', (req, res) => {
        res.render('auth/forgotpassword', { title: 'Forgot password', layout: 'layouts/layout-auth', message: req.flash('message'), error: req.flash('error') });
    });

    app.post('/sendforgotpasswordlink', AuthController.forgotpassword);

    app.get('/resetpassword', AuthController.resetpswdview);

    app.post('/changepassword', AuthController.changepassword);

    app.get('/error', (req, res) => {
        res.render('auth/auth-404', { title: '404 Error', layout: 'layouts/layout-auth' });
    });

    app.post('/save-blog', BagController.createBag);
};
