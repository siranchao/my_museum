import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

export default function AdditionalImages({ imgs }) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Additional Images</Accordion.Header>
                    <Accordion.Body>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {imgs.map((item, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={item}
                                        alt={`slice-${index}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />
        </>

    )
}