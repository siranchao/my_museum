import { getToken } from './auth'


export async function addToFavorites(itemID) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${itemID}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            "Authorization": `jwt ${getToken()}`
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`Add to favorites successful`);
        return data
    }
    else {
        console.log(data.error);
        return [];
    }
}

export async function removeFromFavorites(itemID) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${itemID}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `jwt ${getToken()}`
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`removed from favorites`);
        return data;
    }
    else {
        console.log(data.error);
        return [];
    }


}

export async function getFavorites() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `jwt ${getToken()}`
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`fetch all favorites successful`);
        return data;
    }
    else {
        console.log(data.error);
        return [];
    }
}

export async function addToHistory(history) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${history}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `jwt ${getToken()}`
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`add to history successful`);
        return data;
    }
    else {
        console.log(data.error);
        return []
    }
}

export async function removeFromHistory(itemID) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${itemID}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `jwt ${getToken()}`
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`item removed from history`);
        return data;
    }
    else {
        console.log(data.error);
        return [];
    }
}

export async function getHistory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `jwt ${getToken()}`
        }
    })

    const data = await res.json();

    if (res.status === 200) {
        console.log(`fetch all history`);
        return data;
    }
    else {
        console.log(data.error);
        return [];
    }
}