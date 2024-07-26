import Modal from 'react-bootstrap/Modal';
import Button from'react-bootstrap/Button';

export const ModalMessage = (props) => {

  return (
    <Modal show={props.show} onHide={props.onClose}>
    <Modal.Header closeButton>
        <Modal.Title>{props.body}</Modal.Title>
    </Modal.Header>
    </Modal>
  );
}

export const DeleteConfirmation = ({ showModal, hideModal, confirmModal, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton/>
        <Modal.Body ><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => confirmModal(e) }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

