import Head from 'next/head'
import { favoritesAtom } from '@/store'
import { useAtom } from 'jotai'
import { Row, Col } from 'react-bootstrap'
import CustomCard from '@/components/CustomCard'
import ArtworkCard from '@/components/ArtworkCard'


export default function Favorites() {
    const [favorites, setFavorites] = useAtom(favoritesAtom)

    if (!favorites) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Favorites</title>
                <meta name="description" content="Metropolitan Museum of Art | Favorites" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>

            <main>
                {favorites.length > 0 && <h5 style={{ paddingBottom: "0.5rem" }}>My Favorite Artworks</h5>}

                <Row className='gy-4'>
                    {
                        favorites.length > 0 ?
                            favorites.map((id) => (
                                <ArtworkCard key={item} objectID={id} />
                            ))
                            :
                            <>
                                <CustomCard title={"Sorry, No items in your list"} text={"Try adding your favorite artworks to the list"} />
                            </>
                    }
                </Row>
            </main>
        </>
    )
}