import { useState, useEffect } from 'react'
import React from 'react';
import ArtworkCard from '@/components/ArtworkCard'
import CustomCard from '@/components/CustomCard'
import PageLoading from '@/components/PageLoading'
import Macy from 'macy'

async function fetchById(objectID) {
    const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    const data = await res.json()
    return data
}

async function fetchAll(arr) {
    const promiseList = [];
    for (let i = 0; i < arr.length; i++) {
        promiseList.push(fetchById(arr[i]))
    }
    const list = await Promise.all(promiseList)
    return list
}


const MacyLayout = ({ artworkList, page }) => {
    const [renderList, setRenderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [renderCount, setRenderCount] = useState(0);

    function updateRender() {
        setRenderCount(prev => prev + 1)
    }

    if (!loading) {
        const macy = Macy({
            container: '.macy-container',
            trueOrder: false,
            waitForImages: true,
            margin: 30,
            columns: 4,
            breakAt: {
                1280: 4,
                1024: 3,
                768: 2,
                640: 1
            }
        });

        window.addEventListener('resize', () => {
            macy.recalculate(true);
        });

        macy.recalculate(true);
    }

    useEffect(() => {
        fetchAll(artworkList[page - 1])
            .then((res) => {
                const refine = res.filter((item) => item.primaryImageSmall)
                setRenderList(refine)
                setRenderCount(0)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [artworkList, page])

    useEffect(() => {
        if (renderList.length > 0 && (renderCount === renderList.length)) {
            setLoading(false)
        }
    }, [renderCount, renderList.length])

    return (
        <>
            {loading && <PageLoading />}
            <div className="macy-container" style={{ visibility: loading ? "hidden" : "visible" }}>
                {renderList.length > 0 && (
                    renderList.map((item) => (
                        <ArtworkCard key={item.objectID} data={item} update={updateRender} />
                    ))
                )}

                {(!loading && renderList.length === 0) && (
                    <CustomCard title={"Ops! Nothing can be found"} text={"Sorry no results can be found based on your search. Please try entering for something else or check your keywords."} />
                )}
            </div>
        </>
    )

}

export default MacyLayout;