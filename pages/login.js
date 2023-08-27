import { Card, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { authenticateUser } from '@/lib/auth'
import { getFavorites, getHistory } from '@/lib/userData';
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { useAtom } from 'jotai'
import { searchHistoryAtom, favoritesAtom } from '@/store';
import styles from '../styles/auth.module.css'

export default function Login() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false)

    //Atoms
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favorites, setFavorites] = useAtom(favoritesAtom);

    async function submitForm(e) {
        e.preventDefault();
        clearAlert();
        setLoading(true);
        try {
            await authenticateUser(userName, password);
            await updateAtoms();
            setSuccessful(true);
            setLoading(false);
            setTimeout(() => {
                router.push('/favorites');
            }, 2000);
        }
        catch (err) {
            setSuccessful(false);
            setWarning(err.message);
            setLoading(false);
        }
    }

    function clearAlert() {
        setWarning("");
        setUserName("");
        setPassword("");
    }

    async function updateAtoms() {
        setFavorites(await getFavorites());
        setSearchHistory(await getHistory());
    }

    return (
        <div className={styles.container}>
            <Card bg="light">
                <Card.Body><h4>Login</h4>Please enter your login information below:</Card.Body>
            </Card>
            <br />
            <Form onSubmit={submitForm}>
                {warning && <Alert type={"alert-danger"} title={"Error!"} message={`${warning}, please try again`} action={clearAlert} />}
                {successful && <Alert type={"alert-success"} title={"Success!"} message={"Login successful, page redirecting..."} action={clearAlert} />}
                <Form.Group>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control type="text" id="userName" name="userName" value={userName} onChange={e => setUserName(e.target.value)} /></Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button variant="primary" className="pull-right" type="submit" style={{ marginRight: "2rem" }}>Login</Button>
                    {loading && <Loading />}
                </div>
            </Form>
        </div>
    )
}
