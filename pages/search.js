import Head from 'next/head'
import useSWR from 'swr'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import styles from "@/styles/style.module.css"
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData'
import { readToken } from '@/lib/auth';

export default function AdvancedSearch() {
    let token = readToken();

    //searchHistoryAtom
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/departments`)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            query: "",
            searchBy: "title",
            geoLocation: "",
            medium: "",
            department: "",
            isHighlight: false,
            isOnView: false,
            hasImage: true
        }
    })

    const submitForm = async (data) => {
        let query = ""
        query += `${data?.searchBy}=true`
        query += data.geoLocation ? `&geoLocation=${data.geoLocation}` : ""
        query += data.medium ? `&medium=${data.medium}` : ""
        query += data.department ? `&departmentId=${data.department}` : ""
        query += `&isOnView=${data?.isOnView}`
        query += `&isHighlight=${data?.isHighlight}`
        query += `&hasImages=${data?.hasImage}`
        query += `&q=${data?.query}`
        //add to search history
        if (token) {
            setSearchHistory(await addToHistory(query))
        }

        //redirect to search page
        router.push("/artwork?" + query)
    }

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Search</title>
                <meta name="description" content="Metropolitan Museum of Art | Search" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>

            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Keywords</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="q"
                                {...register("query", { required: true })}
                            />
                            {errors.query?.type === "required" && <p className={styles.invalid}>Search query is required</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    {data &&
                        <Col md={4}>
                            <Form.Label>Departments: </Form.Label>
                            <Form.Select name="department" className="mb-3" {...register("department")}>
                                <option value="">All Departments</option>
                                {data.departments.map(item => (
                                    <option key={item.departmentId} value={item.departmentId}>{item.displayName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    }
                </Row>
                <br />
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="optional" name="geoLocation" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="optional" name="medium" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register("isOnView")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Has Images"
                            name="hasImage"
                            {...register("hasImage")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit" disabled={Object.keys(errors).length > 0}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>

    )
}