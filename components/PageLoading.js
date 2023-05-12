import Spinner from 'react-bootstrap/Spinner';

export default function PageLoading() {
    return (
        <>
            <br />
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2rem'

                }}>
                <Spinner animation="border" role="status" size='lg'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h5 style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 1rem'
                }}>Finding Artworks...</h5>
            </div>
        </>
    );
}

