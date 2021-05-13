
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "./libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { currentSession, signOut } from "./libs/api";
import ReactGA from 'react-ga';

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    history.listen(location => {
      ReactGA.initialize('UA-34432970-3 ');
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname)
    })
  },[history])
  
  useEffect(() => {
    onLoad();
  }, []);
  async function onLoad() {
    // Siit is temporarily down
    setIsAuthenticating(false);
    // try {
    //   await currentSession();
    //   userHasAuthenticated(true);
    // }
    // catch(e) {
    //   if (e.message !== 'Request failed with status code 401') {
    //     alert("Siit is temporarily down.")
    //   }
    // }
    // setIsAuthenticating(false);
  }
  
  async function handleLogout() {
    await signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }
  return (
    !isAuthenticating && (
      // TODO: Check if container-fluid works better for the layout
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              NoSiit
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/horario">
                    <Nav.Link>Horario</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/kardex">
                    <Nav.Link>Kardex</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/calif_partial">
                    <Nav.Link>Calif. Parciales</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/avance_reticular">
                    <Nav.Link>Avance reticular</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                </>
              ) : (
                <>
                  {/* <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer> */}
                  <LinkContainer to="/login">
                    <Nav.Link>Iniciar sesión</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;