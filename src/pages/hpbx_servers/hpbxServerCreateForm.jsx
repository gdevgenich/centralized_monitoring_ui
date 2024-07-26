import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { ModalMessage } from '../../elements/modal'
import Stack from 'react-bootstrap/Stack';

function CreateHPBXServer({fetchHPBXServersData}) {
    const [shortName, setShortname] = useState();
    const [APIFQDN, setAPIFQDN] = useState();
    const [callsFQDN, setCallsFQDN] = useState();
    const [cookies, setCookies] = useCookies(['csrftoken']);
    const [error, setError] = useState({title: "", body: "", show: false});
    
    function handleSubmit(e) {
      e.preventDefault();
        fetch("http://localhost:8000/api/hpbx-servers", {
            method: 'POST',
            credentials: 'include',
            headers:{'X-CSRFTOKEN': cookies.csrftoken,
                     'Content-Type': 'application/json'},
            body: JSON.stringify({
                "short_name": shortName,
                "api_fqdn": APIFQDN,
                "calls_fqdn": callsFQDN,
            })
        })
            .then((response) => {if (!response.ok) {
                setError({
                    title: '',
                    body: 'Server adding failed.',
                    show: true,
                });
              } else {fetchHPBXServersData()}})
            .catch((err) => {console.log("ERROR");
        });
    }

    const errorHandler = () => {
        setError({show : false});
    }

    return (
        <Form method="post" onSubmit={e => {handleSubmit(e)}}>
            <Stack gap={3}>
            <Form.Group controlId="HPBXServerCreateForm.shortName" value={shortName} onChange={e => setShortname(e.target.value)}>
                <Form.Label>Server short name</Form.Label>
                <Form.Control type="text" required />
            </Form.Group>
            <Form.Group controlId="HPBXServerCreateForm.APIFQDN"  value={APIFQDN} onChange={e => setAPIFQDN(e.target.value)}>
                <Form.Label>API FQDN</Form.Label>
                <Form.Control type="text" required />
            </Form.Group>
            <Form.Group controlId="HPBXServerCreateForm.callsFQDN"  value={callsFQDN} onChange={e => setCallsFQDN(e.target.value)}>
                <Form.Label>Calls FQDN</Form.Label>
                <Form.Control type="text" required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add HPBX server
            </Button>
            <ModalMessage title={error.title} body={error.body} onClose={errorHandler} show={error.show}/>
            </Stack>
        </Form>
    );
  }

export default CreateHPBXServer