import Link from 'next/link'
import Cookie from 'js-cookie';
import Head from 'next/head'
import LoginButton from './LoginButton';
import { useFetchUser } from '../hooks/user';
import Router from 'next/router';
import { Container, Row, Navbar, Nav, Image, NavDropdown, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children, title = "fastsociety" }) => {
  const { user, loading } = useFetchUser({ required: false });

  const handleSignOut = () => {
    delete window.__user;
    Cookie.remove("token");
    Router.replace("/");
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ minHeight: "100vh" }}>
        <header>
          <Navbar className="justify-content-between" bg="light">
            {/* <Container> */}
            <Navbar.Brand
              className="px-2"
              href="/"
            >
              <div className='d-flex'>
                <Image
                  src={`/logo.png`}
                  roundedCircle
                  fluid
                  width="40"
                  style={{ backgroundColor: "none" }}
                  height="40"
                />
                <span className='m-auto'>
                  fastsociety
                </span>
              </div>
            </Navbar.Brand>
            {user ? (
              <Nav >
                <Nav.Item className="m-auto"></Nav.Item>
                <NavDropdown className="mt-2" title={window.innerWidth > 500 ? user.name : ''} id="basic-nav-dropdown">
                  <NavDropdown.Item href={`/profile/${user.id}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="m-auto"
                    onClick={handleSignOut}
                    variant="link"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item className="m-auto"></Nav.Item>
                <Nav.Item>
                  <Nav.Link href={`/profile/${user.id}`}>
                    <Image
                      src={user.image}
                      roundedCircle
                      fluid
                      width="40"
                      height="40"
                    />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            ) : (
              <LoginButton />
            )}
            {/* </Navbar.Collapse> */}
            {/* </Container> */}
          </Navbar>
          
        </header>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          closeOnClick
    />
        {children}

      </div>
      <footer className="small">
        </footer>
    </div>
  );
};

export default Layout;