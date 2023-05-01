import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

function Footer() {
    return (
        <footer>
            <Navbar variant="dark" expand="lg" bg="primary" style={{ display: "flex", flexDirection: "column" }}>
                <Nav style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Link href="/" passHref legacyBehavior>
                        <Nav.Link>Home</Nav.Link>
                    </Link>
                    <Link href="/search" passHref legacyBehavior>
                        <Nav.Link>Search</Nav.Link>
                    </Link>
                    <Nav.Link href='https://www.metmuseum.org/' target='_blank'>Visit &quot;The Met&quot;</Nav.Link>
                </Nav>
                <p style={{ fontSize: "0.8rem", textAlign: "center", color: "#fff", margin: "0", padding: "10px" }}>Copyright &copy; 2023 Siran Cao. This website is for study purpose only</p>
            </Navbar>

        </footer>
    );
}

export default Footer;
