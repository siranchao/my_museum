import jwt_decode from "jwt-decode"

function setToken(token) {
    localStorage.setItem("access_token", token);
}


export function getToken() {
    try {
        return localStorage.getItem("access_token");
    }
    catch (err) {
        console.log(err);
        return null;
    }
}


export function removeToken() {
    localStorage.removeItem("access_token");
}


export function readToken() {
    try {
        const token = getToken();
        return token ? jwt_decode(token) : null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}


export function isAuthenticated() {
    const token = getToken();
    return token ? true : false;
}


export async function authenticateUser(username, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            userName: username,
            password: password
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`login successful`);
        setToken(data.token);
        return true;
    }
    else {
        throw new Error(data.message);
    }
}

export async function registerUser(username, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
            userName: username,
            password: password,
            password2: password2
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`registration successful`);
        setToken(data.token);
        return true;
    }
    else {
        throw new Error(data.message)
    }

}
