import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import styles from '@/styles/style.module.css'

const maxLength = 50;


export default function ArtworkCard({ data, update }) {

    return (
        <Card>
            <Link href={`/artwork/${data.objectID}`} passHref>
                <Card.Img variant="top" src={data.primaryImageSmall} onLoad={update} onError={update} />
            </Link>

            <Card.Body>
                <Card.Title>{data.title ?
                    data.title.length > maxLength ? data.title.slice(0, maxLength) + "..." : data.title
                    :
                    "N/A"}
                </Card.Title>
                <section className={styles.textArea}>
                    <div><span className={styles.highlightText}>Date: </span>{data.objectDate ? data.objectDate : "N/A"}</div>
                    <div><span className={styles.highlightText}>Classification: </span>{data.classification ? data.classification : "N/A"}</div>
                    <div><span className={styles.highlightText}>Medium: </span>{data.medium ? data.medium : "N/A"}</div>

                </section>

                <Link href={`/artwork/${data.objectID}`} passHref>
                    <Button variant="outline-success">
                        <strong>ID: </strong>{data.objectID}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}
