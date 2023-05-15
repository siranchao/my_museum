import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AdditionalImages from './AdditionImages';
import { useRouter } from 'next/router';
import styles from '@/styles/style.module.css'
import { useAtom } from 'jotai';
import { favoritesAtom } from '@/store';
import { useEffect, useState } from 'react';
import { addToFavorites, removeFromFavorites } from '@/lib/userData';

export default function ArtworkCardDetail({ objectID }) {
    const router = useRouter()

    const [favorites, setFavorites] = useAtom(favoritesAtom)
    const [added, setAdded] = useState(false)

    const favoritesClicked = async () => {
        if (added) {
            setFavorites(await removeFromFavorites(objectID))
        }
        else {
            setFavorites(await addToFavorites(objectID))
        }
    }

    useEffect(() => {
        setAdded(favorites?.includes(objectID))
    }, [favorites, objectID])



    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)

    return (
        error ?
            <Error statusCode={404} />
            :
            data ?
                <>
                    <Card>
                        {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
                        {data.additionalImages.length > 0 && <AdditionalImages imgs={data.additionalImages} />}
                        <Card.Body>
                            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                            <section className={styles.textArea}>
                                <div><span className={styles.highlightText}>Date: </span>{data.objectDate ? data.objectDate : "N/A"}</div>
                                <div><span className={styles.highlightText}>Classification: </span>{data.classification ? data.classification : "N/A"}</div>
                                <div><span className={styles.highlightText}>Medium: </span>{data.medium ? data.medium : "N/A"}</div>
                            </section>

                            <br />
                            <section className={styles.textArea}>
                                <div><span className={styles.highlightText}>Artist: </span>{data.artistDisplayName ? data.artistDisplayName : "N/A"}
                                    {data.artistDisplayName && <span> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)</span>}
                                </div>
                                <div><span className={styles.highlightText}>Credit Line: </span>{data.creditLine ? data.creditLine : "N/A"}</div>
                                <div><span className={styles.highlightText}>Dimensions: </span>{data.dimensions ? data.dimensions : "N/A"}</div>
                            </section>
                            <br />
                            <section className={styles.detailPageBtnGroup}>
                                <Button variant={added ? "secondary" : "info"} onClick={favoritesClicked} style={{ minWidth: "10rem", maxWidth: "14rem" }}>
                                    {added ? "Remove from Favorites" : "Add to Favorites"}
                                </Button>

                                <Button variant="outline-secondary" onClick={() => router.back()} style={{ width: "80px" }}>
                                    Back
                                </Button>
                            </section>

                        </Card.Body>
                    </Card>
                </>
                :
                null
    )
}