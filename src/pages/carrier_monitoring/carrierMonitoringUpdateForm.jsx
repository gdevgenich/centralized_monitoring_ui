import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { DeleteConfirmation, ModalMessage } from '../../elements/modal'
import Stack from 'react-bootstrap/Stack';
import {useNavigate} from 'react-router-dom'

function UpdateCarrierMonitoring({carrierMonitoring, fetchCarrierMonitoringData}) {
    const [name, setName] = useState(carrierMonitoring.name);
    const [carrier, setCarrier] = useState(carrierMonitoring.carrier);
    const [monServer, setMonServer] = useState(carrierMonitoring.mon_server);
    const [active, setActive] = useState(carrierMonitoring.active);
    const [cookies, setCookies] = useCookies(['csrftoken']);
    const [error, setError] = useState({title: "", body: "", show: false});
    const [deleteModal, setDeleteModal] = useState({showModal: false, hideModal: "", confirmModal: "", message: ""});
    const navigate = useNavigate()

    function handleSubmit(e) {
      e.preventDefault();
        fetch("http://localhost:8000/api/carrier-monitorings/"+carrierMonitoring.id, {
            method: 'POST',
            credentials: 'include',
            headers:{'X-CSRFTOKEN': cookies.csrftoken,
                     'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": name,
                "carrier": carrier,
                "mon_server": monServer,
                "active": active,
            })
        })
            .then((response) => {if (!response.ok) {
                setError({
                    title: '',
                    body: 'Carrier monitoring update failed.',
                    show: true,
                });
              } else {fetchCarrierMonitoringData()}})
            .catch((err) => {console.log("ERROR");
        });
    }
    
    function hanleDelete(e) {
        e.preventDefault();
        fetch("http://localhost:8000/api/carrier-monitorings/"+carrierMonitoring.id, {
            method: 'DELETE',
            credentials: 'include',
            headers:{'X-CSRFTOKEN': cookies.csrftoken},
        })
            .then((response) => {
                hideDelete();
                if (!response.ok) {
                setError({
                    title: '',
                    body: 'Server deletion failed.',
                    show: true,
                });
              } else {navigate("/carrier-monitorings")}})
            .catch((err) => {console.log("ERROR");
        });
    }

    const hideDelete = () => {
        setDeleteModal({showModal: false});
    }

    const showDelete = () => {
        setDeleteModal({showModal: true, hideModal: hideDelete, confirmModal: hanleDelete, message: "Delete carrier monitoring?"});
    }

    const errorHandler = () => {
        setError({show : false});
    }

    return (
        <Stack gap={3}>
          <Form method="post" onSubmit={e => {handleSubmit(e)}}>
          <Stack gap={3}>
            <Form.Group controlId="CarrierMonitoringUpdateForm.name" value={name} onChange={e => setName(e.target.value)}>
                <Form.Label>Carrier monitoring name</Form.Label>
                <Form.Control type="text" defaultValue={name} />
            </Form.Group>
            <Form.Group controlId="CarrierMonitoringUpdateForm.carrier"  value={carrier} onChange={e => setCarrier(e.target.value)}>
                <Form.Label>Carrier</Form.Label>
                <Form.Control type="text" defaultValue={carrier} required />
            </Form.Group>
            <Form.Group controlId="CarrierMonitoringUpdateForm.monServer"  value={monServer} onChange={e => setMonServer(e.target.value)}>
                <Form.Label>Monitoring server</Form.Label>
                <Form.Control type="text" defaultValue={monServer} required />
            </Form.Group>
            <Form.Group controlId="CarrierMonitoringUpdateForm.active"  value={active} onChange={e => setActive(!active)}>
                <Form.Label>Active</Form.Label>
                <Form.Check type="checkbox" defaultChecked={active}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Update Carrier monitoring
            </Button>
            <ModalMessage title={error.title} body={error.body} onClose={errorHandler} show={error.show}/>
            <DeleteConfirmation showModal={deleteModal.showModal} hideModal={deleteModal.hideModal} 
            confirmModal={deleteModal.confirmModal} message={deleteModal.message}/>
          </Stack>
          </Form>
          <Button variant='danger' type="button" onClick={showDelete}>
            Delete Carrier Monitoring
          </Button>
        </Stack>
    );
  }

export default UpdateCarrierMonitoring