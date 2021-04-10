const routes = require('express').Router();

routes
    .use('/mad', require('./mad'))
    .use('/admin', require('./admin'))
    .use('/auth', require('./auth'))

    .get('/', (req, res, next) => {
        // This is the primary index, always handled last. 
        res.render('pages/index', {
            title: 'C9FL | Home',
            path: '/'
        });
    })

    //404 Page for pages that are not found
    .use((req, res, next) => {
        res.status(404).render('pages/404', {
            title: 'C9FL | 404 - Page Not Found',
            path: req.url,
            isAuthenticated: req.session.isLoggedIn
        })
    })

    // //500 Page for technical errors
    // .use((error, req, res, next) => {
    //     res.status(500).render('pages/500', {
    //         title: 'C9FL | Minor Issue',
    //         path: '/500',
    //         isAuthenticated: req.session.isLoggedIn
    //     });
    // });

module.exports = routes;