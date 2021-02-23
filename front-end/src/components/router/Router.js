import React from 'react';
import {Route, Switch} from 'react-router';
import User from "../user/User";
import DisplayUser from "../user/DisplayUser";
import Header from "../header/Header";
import Home from "../user/Home";

const Router = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/adicionar-usuario" component={User}/>
                <Route path="/listar-usuarios" component={DisplayUser}/>
            </Switch>
        </div>
    );
};

export default Router;