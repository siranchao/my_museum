import Head from 'next/head'
import Image from "next/image"
import { Row, Col } from 'react-bootstrap'
import styles from "@/styles/style.module.css"
import bannerImg from "@/public/img/Banner.jpg"

export default function Home() {
  return (
    <>
      <Head>
        <title>Metropolitan Museum of Art | Home</title>
        <meta name="description" content="Metropolitan Museum of Art | Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/museum.ico" />
      </Head>
      <main>
        <h5 style={{ paddingBottom: "0.5rem" }}>Welcome to Metropolitan Museum of Art</h5>
        <Row>
          <Col md={12}>
            <Image
              src={bannerImg}
              alt='main-photo'
              priority={true}
              className={styles.banner}
            />
          </Col>
        </Row>

        <h5>About &quot;The Met&quot;</h5>
        <Row>
          <Col md={6}>
            <p className={styles.text}>The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
            <p className={styles.text}>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.</p>
          </Col>
          <Col md={6}>
            <p className={styles.text}>The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.</p>
            <p className={styles.text}>For more information please visit: <a className={styles.link} href='https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art' target="_blank">https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a></p>

          </Col>
        </Row>
      </main>
    </>
  )
}
