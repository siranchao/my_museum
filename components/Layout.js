import { Container } from "react-bootstrap";
import MainNav from "./MainNav";
import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <div className="layout">
            <div>
                <MainNav />
            </div>

            <div className="content">
                <br />
                <br />
                <Container>
                    {children}
                </Container>
                <br />
                <br />
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

