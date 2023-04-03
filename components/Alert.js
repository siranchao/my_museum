
export default function Alert({ type, title, message, action }) {

    return (
        <>
            <div className={`alert alert-dismissible ${type}`}>
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={action}></button>
                <h5 className="alert-heading">{title}</h5>
                <p className="mb-0">{message}</p>
            </div>
        </>
    )
}