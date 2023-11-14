import Card from 'react-bootstrap/Card';
import styles from '@/styles/departments.module.css'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export default function DepartmentCard({ department, deptId }) {
    const router = useRouter()
    const clickDept = () => {
        router.push(`department?departmentIds=${deptId}`)
    }

    const imgRef = useRef(null)

    function loaded() {
        imgRef.current.classList.add('deptImgLoaded')
    }

    useEffect(() => {
        const node = imgRef.current
        if (node.complete) {
            loaded()
        }
        else {
            node.addEventListener('load', loaded)
        }

        return () => {
            node.removeEventListener('load', loaded)
        }
    }, [])

    return (
        <>
            <Card className={styles.deptCard} onClick={clickDept}>
                <div className="blurImg" style={{ backgroundImage: `url(/img/small-img/${deptId}.jpg)` }} >
                    <Card.Img variant="top"
                        src={`https://res.cloudinary.com/siran-chao/image/upload/v1683777371/museum_departments/met_dept_id_${deptId}.jpg`}
                        alt='department-photo'
                        round='false'
                        className="deptImg"
                        loading="lazy"
                        ref={imgRef}
                    />
                </div>
                <Card.Text className={styles.deptName}>{department}</Card.Text>
            </Card>
        </>
    )
}