import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { isAuthenticated, removeToken, readToken } from '@/lib/auth';


export default function MainNav() {
    let token = readToken();

    //global state
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()
    const [formData, setFormData] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)

    function logout() {
        removeToken();
        router.push('/login')
    }

    const handleChange = (e) => {
        setFormData(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const route = `/artwork?title=true&q=${formData}`
        setFormData("")
        //add to search history
        setSearchHistory(await addToHistory(`title=true&q=${formData}`))
        router.push(route)
    }

    const collapseNav = () => {
        setIsExpanded(false)
    }

    return (
        <>
            <Navbar variant="dark" expand="lg" fixed="top" bg="primary" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand><Link href="/" passHref legacyBehavior><Nav.Link onClick={collapseNav} id='logo'>Portable Museum</Nav.Link></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        &nbsp;
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link onClick={collapseNav} active={router.pathname === "/"}>Home</Nav.Link></Link>
                            <Link href="/departments" passHref legacyBehavior><Nav.Link onClick={collapseNav} active={router.pathname === "/departments"}>Departments</Nav.Link></Link>
                            {token && <Link href="/search" passHref legacyBehavior><Nav.Link onClick={collapseNav} active={router.pathname === "/search"} >Advanced Search</Nav.Link></Link>}
                        </Nav>
                        &nbsp;
                        {token &&
                            <Form className="d-flex" onSubmit={handleSubmit}>
                                <Form.Control
                                    type="search"
                                    placeholder="Artwork Title"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleChange}
                                    value={formData}
                                />
                                <Button variant="outline-success" type='submit' onClick={collapseNav}>Search</Button>
                            </Form>
                        }

                        &nbsp;

                        {token ?
                            <Nav>
                                <NavDropdown title={token?.userName} id="basic-nav-dropdown">
                                    <Link href="/favorites" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={collapseNav} active={router.pathname === "/favorites"} >Favorites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={collapseNav} active={router.pathname === "/history"} >Search History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={() => { collapseNav(); logout() }} >Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <Nav>
                                <NavDropdown title={"My Account"} id="basic-nav-dropdown">
                                    <Link href="/login" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={collapseNav} active={router.pathname === "/login"} >Login</NavDropdown.Item>
                                    </Link>
                                    <Link href="/register" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={collapseNav} active={router.pathname === "/register"} >Register</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <br />
            <br />
        </>
    );
}
