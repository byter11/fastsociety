import Link from 'next/link'
import Head from 'next/head'
import LoginButton from './LoginButton';
import { useFetchUser } from '../hooks/user';
import { Container, Navbar , Nav, Image} from 'react-bootstrap';

const Layout = ({
    children,
    title = 'fastsociety',
}) => {
    const { user, loading } = useFetchUser({required: false});
    
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div style={{minHeight: '101vh'}}>
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand className='mx-auto' href="/">fastsociety</Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                            {/*     <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav> */}
                            {user
                            ? <Nav.Link href={`/profile/${user.id}`}>
                                <Image src={user.image} roundedCircle fluid width="40" height="40"/>
                              </Nav.Link>
                            : <LoginButton/>
                            }
                        {/* </Navbar.Collapse> */}
                    </Container>
                </Navbar>
            </header>

            {children}

            <footer style={{bottom: 0, position: 'absolute'}}>{'yo'}</footer>
            </div>
        </div>
    )
}

export default Layout;