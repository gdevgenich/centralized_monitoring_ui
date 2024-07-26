import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { ModalMessage } from '../../elements/modal'
import Stack from 'react-bootstrap/Stack';

function CreateCarrierMonitoring({fetchCarrierMonitoringsData}) {
    const [name, setName] = useState();
    const [carrier, setCarrier] = useState();
    const [monServer, setMonServer] = useState();
    const [active, setActive] = useState(false);
    const [cookies, setCookies] = useCookies(['csrftoken']);
    const [error, setError] = useState({title: "", body: "", show: false});
    
    function handleSubmit(e) {
      e.preventDefault();
        console.log(active)
        fetch("http://localhost:8000/api/carrier-monitorings", {
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
                    body: 'Carrier monitoring adding failed.',
                    show: true,
                });
              } else {fetchCarrierMonitoringsData()}})
            .catch((err) => {console.log("ERROR");
        });
    }

    const errorHandler = () => {
        setError({show : false});
    }

    return (
        <Form method="post" onSubmit={e => {handleSubmit(e)}}>
            <Stack gap={3}>
            <Form.Group controlId="CarrierMonitoringCreateForm.name" value={name} onChange={e => setName(e.target.value)}>
                <Form.Label>Carrier monitoring name</Form.Label>
                <Form.Control type="text" required />
            </Form.Group>
            <Form.Group controlId="CarrierMonitoringCreateForm.carrier"  value={carrier} onChange={e => setCarrier(e.target.value)}>
                <Form.Label>Carrier name</Form.Label>
                <Form.Control type="text" required />
            </Form.Group>
            <Form.Group controlId="CarrierMonitoringCreateForm.monServer"  value={monServer} onChange={e => setMonServer(e.target.value)}>
                <Form.Label>Monitoring server</Form.Label>
                <Form.Control type="text" required />
            </Form.Group>
            <Form.Group controlId="CarrierMonitoringCreateForm.active"  value={active} onChange={e => setActive(!active)}>
                <Form.Label>Active</Form.Label>
                <Form.Check type="checkbox"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Add carrier monitoring
            </Button>
            <ModalMessage title={error.title} body={error.body} onClose={errorHandler} show={error.show}/>
            </Stack>
        </Form>
    );
  }

export default CreateCarrierMonitoring