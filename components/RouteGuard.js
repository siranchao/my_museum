import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";
import { favoritesAtom, searchHistoryAtom } from "@/store";
import { useAtom } from 'jotai'
import { getFavorites, getHistory } from "@/lib/userData";


const PUBLIC_PATHS = ["/", "/login", "/register", "/_error"]

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    //Atoms
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);

        router.events.on('routeChangeComplete', authCheck);

        //unmount effect
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        }
        else {
            setAuthorized(true);
        }
    }

    async function updateAtoms() {
        setFavorites(await getFavorites());
        setSearchHistory(await getHistory());
    }

    return (
        <>
            {authorized && props.children}
        </>
    )

}
