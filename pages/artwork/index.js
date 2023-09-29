import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Row, Col, Pagination } from 'react-bootstrap'
import validData from '@/public/data/validObjectIDList.json'
import PageLoading from '@/components/PageLoading'

// import MacyLayout from '@/components/MacyLayout'
import dynamic from 'next/dynamic'
const MacyLayout = dynamic(() => import('@/components/MacyLayout'), { ssr: false })

const PER_PAGE = 28

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}

export default function ArtworkList() {
    const [loading, setLoading] = useState(true)
    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(1)


    const router = useRouter()
    const finalQuery = router.asPath.split('?')[1]

    const { data } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

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
            {loading ? <PageLoading /> : (
                <>
                    <MacyLayout artworkList={artworkList} page={page} />

                    {artworkList.length > 0 &&
                        <>
                            <br />
                            <br />

                            <Row>
                                <Col>
                                    <Pagination>
                                        <Pagination.First
                                            onClick={() => {
                                                previousTenPages()
                                                scrollToTop()
                                            }}
                                            disabled={artworkList.length === 1 || page === 1}
                                        />
                                        <Pagination.Prev
                                            onClick={() => {
                                                previousPage()
                                                scrollToTop()
                                            }}
                                            disabled={artworkList.length === 1 || page === 1}
                                        />
                                        <Pagination.Item>{page}</Pagination.Item>
                                        <Pagination.Next
                                            onClick={() => {
                                                nextPage()
                                                scrollToTop()
                                            }}
                                            disabled={artworkList.length === 1 || page === artworkList.length}
                                        />
                                        <Pagination.Last
                                            onClick={() => {
                                                nextTenPages()
                                                scrollToTop()
                                            }}
                                            disabled={artworkList.length === 1 || page === artworkList.length}
                                        />
                                    </Pagination>
                                </Col>
                            </Row>
                        </>
                    }

                </>
            )}
        </>
    )
}