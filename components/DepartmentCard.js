import Card from 'react-bootstrap/Card';
import styles from '@/styles/departments.module.css'
import { useRouter } from 'next/router'

export default function DepartmentCard({ department, deptId }) {
    const router = useRouter()
    const clickDept = () => {
        router.push(`department?departmentIds=${deptId}`)
    }

    return (
        <>
            <Card className={styles.deptCard} onClick={clickDept}>
                <Card.Img variant="top"
                    src={`https://res.cloudinary.com/siran-chao/image/upload/v1683777371/museum_departments/met_dept_id_${deptId}.jpg`}
                    alt='department-photo'
                    round='false'
                    className={styles.deptImg}
                />
                <Card.Text className={styles.deptName}>{department}</Card.Text>
            </Card>
        </>
    )
}