import Link from 'next/link'
import Cookie from 'js-cookie';
import Head from 'next/head'
import LoginButton from './LoginButton';
import { useFetchUser } from '../hooks/user';
import Router from 'next/router';
import { Container, Row, Navbar, Nav, Image,NavDropdown, Button } from 'react-bootstrap';

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
                <Nav.Link href={`/`}>
                <Image 
                    src={`/logo.png`}
                    roundedCircle
                    fluid
                    width="50"
                    style={{ backgroundColor: "none" }}
                    height="50"
                />
                </Nav.Link>
                <span className='m-auto'>
                Fast Society
              </span>
              </div>
            </Navbar.Brand>
            {user ? (
              <Nav >
                <Nav.Item className="m-auto"></Nav.Item>
                <NavDropdown className="mt-2" title={user.name} id="basic-nav-dropdown">
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

        {children}

        {/* <footer style={{bottom: 0, position: 'absolute'}}>{'yo'}</footer> */}
      </div>
    </div>
  );
};

export default Layout;