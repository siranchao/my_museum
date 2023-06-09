import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from 'next/error'
import { Row, Col, Pagination } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'
import validData from '@/public/data/validObjectIDList.json'
import CustomCard from '@/components/CustomCard'
import PageLoading from '@/components/PageLoading'

const PER_PAGE = 12


export default function ArtworkList() {
    const [loading, setLoading] = useState(true)
    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(1)

    const router = useRouter()
    const finalQuery = router.asPath.split('?')[1]

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    const previousPage = () => {
        if (page > 1)
            setPage(page - 1)
    }
    const nextPage = () => {
        if (page < artworkList.length)
            setPage(page + 1)
    }
    const previousTenPages = () => {
        if (page > 10)
            setPage(page - 10)
    }
    const nextTenPages = () => {
        if (page < artworkList.length - 10)
            setPage(page + 10)
    }

    useEffect(() => {
        if (data) {
            //only filter valid items from json data
            const filteredData = validData.objectIDs.filter((item) => {
                return data.objectIDs?.includes(item)
            })

            //calculate items for each page
            const results = []
            for (let i = 0; i < filteredData.length; i += PER_PAGE) {
                const chunk = filteredData.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results)
            setLoading(false)
        }
        setPage(1)
    }, [data])

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Artworks</title>
                <meta name="description" content="Metropolitan Museum of Art | Artworks" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>
            {loading ? <PageLoading /> :
                error ? <Error statusCode={404} /> :
                    artworkList ?
                        <>
                            <Row className='gy-4'>
                                {
                                    artworkList.length > 0 ?
                                        artworkList[page - 1].map((item) => (
                                            <Col lg={3} md={4} sm={6} xs={12} key={item}>
                                                <ArtworkCard objectID={item} />
                                            </Col>
                                        ))
                                        :
                                        <CustomCard title={"Ops! Nothing can be found"} text={"Sorry no results can be found based on your search. Please try entering for something else or check your keywords."} />

                                }
                            </Row>

                            {
                                artworkList.length > 0 &&
                                <>
                                    <br />
                                    <br />

                                    <Row>
                                        <Col>
                                            <Pagination>
                                                <Pagination.First onClick={previousTenPages} disabled={artworkList.length === 1 || page === 1} />
                                                <Pagination.Prev onClick={previousPage} disabled={artworkList.length === 1 || page === 1} />
                                                <Pagination.Item>{page}</Pagination.Item>
                                                <Pagination.Next onClick={nextPage} disabled={artworkList.length === 1 || page === artworkList.length} />
                                                <Pagination.Last onClick={nextTenPages} disabled={artworkList.length === 1 || page === artworkList.length} />
                                            </Pagination>
                                        </Col>
                                    </Row>
                                </>

                            }

                        </>
                        :
                        null
            }
        </>
    )
}