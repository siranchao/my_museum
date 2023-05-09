import Card from 'react-bootstrap/Card';


export default function DepartmentCard({ department, deptId }) {


    return (
        <>
            <Card style={{ width: '20rem', height: '20rem', padding: '1rem' }}>
                <Card.Img variant="top" src="https://res.cloudinary.com/siran-chao/image/upload/v1683666898/asset/sample_b3ait1.jpg" alt='department-photo' rounded="true" />
                <Card.Text>{department}</Card.Text>
            </Card>
        </>
    )
}