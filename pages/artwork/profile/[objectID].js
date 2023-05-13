import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from "next/router"
import { Row, Col } from "react-bootstrap"
import useSWR from 'swr'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import styles from '@/styles/style.module.css'


export default function ArtworkProfile() {
    const router = useRouter()
    const { objectID } = router.query

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Artwork Profile</title>
                <meta name="description" content="Metropolitan Museum of Art | Artwork Profile" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>
            {
                objectID ?
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Artwork Profile ID: {data.objectID}</Card.Title>
                                    <h6>{data.title}</h6>
                                    <Table striped borderless hover responsive size='sm'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Attribute: </th>
                                                <th>Information: </th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.table}>
                                            {Object.keys(data).map((key, index) => {
                                                if (key === "constituents" || key === "measurements" || key === "tags") {
                                                    return null
                                                }
                                                else if (key === "additionalImages") {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{key}</td>
                                                            <td>{data[key].map((item, index) => <p key={index}>{item}</p>)}</td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{key}</td>
                                                            <td>{data[key]}</td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </Table>


                                    <br />
                                    <section className={styles.detailPageBtnGroup}>
                                        <Button variant="outline-secondary" onClick={() => router.back()} style={{ width: "80px" }}>
                                            Back
                                        </Button>
                                    </section>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Error statusCode={404} />
            }
        </>
    )
}