import Head from 'next/head'
import useSWR from 'swr'
import CustomCard from '@/components/CustomCard'
import DepartmentCard from '@/components/DepartmentCard'
import { Container, Row, Col } from 'react-bootstrap'


export default function Departments() {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/departments`)

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Departments</title>
                <meta name="description" content="Metropolitan Museum of Art | Departments" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>

            <main>
                <h3>Departments</h3>
                {data ?
                    <Container>
                        <Row>
                            {data.departments.map(item =>
                                <Col xs={12} md={6}>
                                    <DepartmentCard key={item.departmentId} department={item.displayName} deptId={item.departmentId} />
                                </Col>
                            )}
                        </Row>
                    </Container>


                    :
                    <CustomCard title={"Sorry, No department data available"} text={"Please try again later"} />
                }
            </main>
        </>

    )
}