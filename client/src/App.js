import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./component/Home";
import { Container, Typography, Button } from "@material-ui/core";
import { StateProvider } from "./store.js";

const NotFound = () => (
  <Container align="center" className="my-5">
    <Typography gutterBottom variant="h1">
      404
    </Typography>
    <Typography gutterBottom variant="h4">
      This page does not exist.
    </Typography>
    <Link className="text-decoration-none" to="/">
      <Button color="primary" variant="outlined">
        Home
      </Button>
    </Link>
  </Container>
);

const App = () => {
  return (
    <StateProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </StateProvider>
  );
};

export default App;
