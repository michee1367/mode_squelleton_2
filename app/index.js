let {ManagerContainer} = require("./container")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

class App {

    constructor() {
        this._managerContainer = ManagerContainer.instance;
    }

    /**
     * @return {ManagerContainer} 
     */
    get managerContainer() {
        return this._managerContainer
    }

    /**
     * permet de declencher le processus d'enregistrement des bindings 
     */
    register() {


        this.managerContainer.boot();
    }


    /**
     * permet de demarer l'application
     */
    boot() {

        if(this.managerContainer.isBoot) {
            var app = express();
            app.use(logger('dev'));
            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));
            app.use(cookieParser());
            app.use(express.static(path.join(__dirname, 'public')));

            // catch 404 and forward to error handler
            app.use(function(req, res, next) {
                next(createError(404));
            });
            
            // error handler
            app.use(function(err, req, res, next) {
                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
            
                // render the error page
                res.status(err.status || 500);
                res.json({
                    message:err.message
                });
            });

            console.log("The application is started :)")
            return app;
  
            
        }

        throw new Error("app not bootable :(")

    }




}

module.exports = App