import { Card, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { registerUser } from '@/lib/auth';

export default function Register() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false)

    async function submitForm(e) {
        e.preventDefault();
        clearAlert();
        setLoading(true);
        try {
            await registerUser(userName, password, password2);
            setSuccessful(true);
            setLoading(false);
            setTimeout(() => {
                router.push('/');
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
        setPassword2("");
    }


    return (
        <>
            <Card bg="light">
                <Card.Body><h4>Register</h4>Please enter your register information below:</Card.Body>
            </Card>
            <br />
            <Form onSubmit={submitForm}>
                {warning && <Alert type={"alert-danger"} title={"Error!"} message={`${warning}, please try again`} action={clearAlert} />}
                {successful && <Alert type={"alert-success"} title={"Success!"} message={"Account registration successful, page redirecting..."} action={clearAlert} />}
                <Form.Group>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control type="text" id="userName" name="userName" value={userName} onChange={e => setUserName(e.target.value)} /></Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Re-enter Password:</Form.Label>
                    <Form.Control type="password" id="password2" name="password2" value={password2} onChange={e => setPassword2(e.target.value)} />
                </Form.Group>
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button variant="primary" className="pull-right" type="submit" style={{ marginRight: "2rem" }}>Register</Button>
                    {loading && <Loading />}
                </div>
            </Form>
        </>
    )
}