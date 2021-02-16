import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login"
import Kardex from "./containers/Kardex";
import AvanceRet from "./containers/Avance_ret";
import Calif from "./containers/Calif";
import GruposCargados from "./containers/GruposCargados";
import Horario from "./containers/Horario";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <AuthenticatedRoute exact path="/calif_partial">
        <Calif />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/kardex">
        <Kardex />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/avance_reticular">
        <AvanceRet />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/grupos_cargados">
        <GruposCargados />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/horario">
        <Horario />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}