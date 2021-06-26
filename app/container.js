let {asClass, createContainer, asValue } = require("awilix");
//const App = require("./index")


class ManagerContainer {



    constructor() {


        this.bindings = {};
        //this.container = createContainer();

    }

    /**
     * permet l'enregistrement des classes ainsi que les valeur fixe
     */
    addBinding(bindings) {

        if(bindings) {
            this.bindings = {...this.bindings, ...bindings}
            return this
        }

        throw new Error("invalid bindings :(")

    }

    /**
     * permet d'initialiser un nouveau conteneur
     */
    boot() {

        this._container = createContainer()

        this._container.register(this.bindings)

    }

    /**
     * 
     */
    get container() {
        if(this._container) {

            return this._container

        }

        throw new Error("container not boot")
    }

    /**
     * 
     */
    get isBoot() {
        return this._container;
    }

    /**
     * 
     */
    static get instance() {
        if(!ManagerContainer._instance) {
            ManagerContainer._instance = new ManagerContainer();
        }

        return ManagerContainer._instance;
    }
}



module.exports = {ManagerContainer, asClass, asValue}