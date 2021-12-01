import Link from 'next/link'
import Head from 'next/head'
import LoginButton from 'LoginButton';
import { useFetchUser } from '../hooks/user';

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
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">fastsociety</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                            {user
                            ? <LoginButton/>
                            : user.name
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            {children}

            <footer>{''}</footer>
        </div>
    )
}

export default Layout;