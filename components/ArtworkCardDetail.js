import useSWR from 'swr'
import Error from 'next/error'
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AdditionalImages from './AdditionImages';
import { useRouter } from 'next/router';
import styles from '@/styles/style.module.css'
import { useAtom } from 'jotai';
import { favoritesAtom } from '@/store';
import { useEffect, useState } from 'react';
import { addToFavorites, removeFromFavorites } from '@/lib/userData';
import { readToken } from '@/lib/auth';

export default function ArtworkCardDetail({ objectID }) {
    let token = readToken();
    const router = useRouter()

    const [favorites, setFavorites] = useAtom(favoritesAtom)
    const [added, setAdded] = useState(false)

    const favoritesClicked = async () => {
        if (!token) {
            window.alert("Please login to use this feature")
            return
        }

        if (added) {
            setFavorites(await removeFromFavorites(objectID))
        }
        else {
            setFavorites(await addToFavorites(objectID))
        }
    }

    const tagClicked = (tag) => {
        router.push(`/artwork?tags=true&hasImages=true&q=${tag}`)
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
                                <div><span className={styles.highlightText}>Culture: </span>{data.culture ? data.culture : ""}</div>
                                <div><span className={styles.highlightText}>Period: </span>{data.period ? data.period : ""}</div>
                                <br />
                                <div><span className={styles.highlightText}>Classification: </span>{data.classification ? data.classification : "N/A"}</div>
                                <div><span className={styles.highlightText}>Medium: </span>{data.medium ? data.medium : "N/A"}</div>
                                <div><span className={styles.highlightText}>Artist: </span>{data.artistDisplayName ? data.artistDisplayName : "N/A"}
                                    {data.artistDisplayName && <span> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)</span>}
                                </div>
                            </section>

                            <section className={styles.textArea}>
                                <div><span className={styles.highlightText}>Department: </span>{data.department ? <Link href="/departments">{data.department}</Link> : "N/A"}</div>
                                <div><span className={styles.highlightText}>Source of Collection: </span>{data.creditLine ? data.creditLine : "N/A"}</div>
                                <div><span className={styles.highlightText}>Dimensions: </span>{data.dimensions ? data.dimensions : "N/A"}</div>
                                <br />
                                <div><span className={styles.highlightText}>Tags: </span>{data.tags ?
                                    data.tags.map((item, index) =>
                                        <Button key={index}
                                            onClick={() => tagClicked(item.term)}
                                            size='sm'
                                            variant='outline-info'
                                            style={{ margin: "0 0.5rem", padding: "0.25rem" }}>{item.term}</Button>)
                                    : ""}
                                </div>
                            </section>
                            <br />
                            <section className={styles.detailPageBtnGroup}>
                                <div style={{ marginBottom: "1rem" }}>
                                    <Button variant={added ? "secondary" : "info"} onClick={favoritesClicked} style={{ minWidth: "10rem", maxWidth: "14rem", marginRight: "1rem" }}>
                                        {added ? "Remove Favorite" : "Add to Favorite"}
                                    </Button>

                                    <Link href={`/artwork/profile/${objectID}`} passHref>
                                        <Button variant="outline-success">Artwork Profile</Button>
                                    </Link>
                                </div>

                                <Button variant="outline-secondary" onClick={() => router.back()} style={{ width: "80px", marginBottom: "1rem" }}>
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