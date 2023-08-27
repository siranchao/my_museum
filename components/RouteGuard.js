import { useRouter } from "next/router"
import { useState, useEffect, useCallback } from "react";
import { isAuthenticated } from "@/lib/auth";
import { favoritesAtom, searchHistoryAtom } from "@/store";
import { useAtom } from 'jotai'
import { getFavorites, getHistory } from "@/lib/userData";


//const PUBLIC_PATHS = ["/", "/departments", "/login", "/register", "/_error"]
const PROTECTED_PATHS = ["/favorites", "/history"]

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    //Atoms
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const authCheck = useCallback((url) => {
        const path = url.split('?')[0];
        if (!isAuthenticated() && PROTECTED_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        }
        else {
            setAuthorized(true);
        }
    }, [router]);

    const updateAtoms = useCallback(async () => {
        setFavorites(await getFavorites());
        setSearchHistory(await getHistory());
    }, [setFavorites, setSearchHistory]);


    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);

        router.events.on('routeChangeComplete', authCheck);

        //unmount effect
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [authCheck, updateAtoms, router.events, router.pathname]);


    return (
        <>
            {authorized && props.children}
        </>
    )

}
