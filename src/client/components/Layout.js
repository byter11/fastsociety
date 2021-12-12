import Link from 'next/link'
import Cookie from 'js-cookie';
import Head from 'next/head'
import LoginButton from './LoginButton';
import { useFetchUser } from '../hooks/user';
import Router from 'next/router';
import { Container, Row, Navbar, Nav, Image,NavDropdown, Button } from 'react-bootstrap';
const Layout = ({
    children,
    title = 'fastsociety',
}) => {
    const { user, loading } = useFetchUser({ required: false });

    const handleSignOut = () => {
        delete window.__user;
        Cookie.remove('token');
        Router.replace('/');
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div style={{ minHeight: '100vh' }}>
                <header>
                    <Navbar bg="light">
                        {/* <Container> */}
                        <Navbar.Brand className='mx-auto' style={{ paddingLeft: '100px' }} href="/">
                            
                        </Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                        {/*     <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav> */}
                        {user
                            ? <Nav>
                                <Nav.Item class='m-auto'>
                                    
                                </Nav.Item>
                                <NavDropdown title={user.name.substring(8, user.name.length)} id="basic-nav-dropdown">
                                    <NavDropdown.Item href={`/profile/${user.id}`}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item className="m-auto" onClick={handleSignOut} variant="link" style={{color: 'black', textDecoration: 'none'}}>
                                        Sign Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Item className="m-auto">
                                    
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href={`/profile/${user.id}`}>
                                        <Image src={user.image} roundedCircle fluid width="40" height="40" />
                                    </Nav.Link>
                                </Nav.Item>
                                
                            </Nav>
                            : <LoginButton />
                        }
                        {/* </Navbar.Collapse> */}
                        {/* </Container> */}
                    </Navbar>
                </header>

                {children}

                {/* <footer style={{bottom: 0, position: 'absolute'}}>{'yo'}</footer> */}
            </div>
        </div>
    )
}

export default Layout;