import { Toast } from 'react-bootstrap'

const Alert = ({ show, toastText, handleToast }) => {
    return (
        <Toast show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 30, right: 10, width: 500, backgroundColor: 'red' }}>
            <Toast.Header>
                <strong className="mr-auto">Error en el registro</strong>
            </Toast.Header>
            <Toast.Body>{toastText}</Toast.Body>
        </Toast>
    )
}

export default Alert