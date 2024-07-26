import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { DeleteConfirmation, ModalMessage } from '../../elements/modal'
import Stack from 'react-bootstrap/Stack';
import {useNavigate} from 'react-router-dom'

function UpdateHPBXServer({hpbxServer, fetchHPBXServerData}) {
    const [shortName, setShortName] = useState(hpbxServer.short_name);
    const [APIFQDN, setAPIFQDN] = useState(hpbxServer.api_fqdn);
    const [callsFQDN, setCallsFQDN] = useState(hpbxServer.calls_fqdn);
    const [cookies, setCookies] = useCookies(['csrftoken']);
    const [error, setError] = useState({title: "", body: "", show: false});
    const [deleteModal, setDeleteModal] = useState({showModal: false, hideModal: "", confirmModal: "", message: ""});
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8000/api/hpbx-servers/"+hpbxServer.id, {
            method: 'POST',
            credentials: 'include',
            headers:{'X-CSRFTOKEN': cookies.csrftokenv,
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
                    body: 'Server update failed.',
                    show: true,
                });
              } else {fetchHPBXServerData()}})
            .catch((err) => {console.log("ERROR");
        });
    }
    
    function hanleDelete(e) {
        e.preventDefault();
        fetch("http://localhost:8000/api/hpbx-servers/"+hpbxServer.id, {
            method: 'DELETE',
            credentials: 'include',
            headers:{'X-CSRFTOKEN': cookies.csrftoken,
                     'Content-Type': 'application/json'},
        })
            .then((response) => {
                hideDelete();
                if (!response.ok) {
                setError({
                    title: '',
                    body: 'Server deletion failed.',
                    show: true,
                });
              } else {navigate("/hpbx-servers")}})
            .catch((err) => {console.log("ERROR");
        });
    }

    const hideDelete = () => {
        setDeleteModal({showModal: false});
    }

    const showDelete = () => {
        setDeleteModal({showModal: true, hideModal: hideDelete, confirmModal: hanleDelete, message: "Delete server?"});
    }

    const errorHandler = () => {
        setError({show : false});
    }

    return (
        <Stack gap={3}>
          <Form method="post" onSubmit={e => {handleSubmit(e)}}>
          <Stack gap={3}>
            <Form.Group controlId="HPBXServerUpdateForm.shortName" value={shortName} onChange={e => setShortName(e.target.value)}>
                <Form.Label>Short name</Form.Label>
                <Form.Control type="text" defaultValue={hpbxServer.short_name}/>
            </Form.Group>
            <Form.Group controlId="HPBXServerUpdateForm.APIFQDN"  value={APIFQDN} onChange={e => setAPIFQDN(e.target.value)}>
                <Form.Label>API FQDN</Form.Label>
                <Form.Control type="text" defaultValue={hpbxServer.api_fqdn} required />
            </Form.Group>
            <Form.Group controlId="HPBXServerUpdateForm.callsFQDN"  value={callsFQDN} onChange={e => setCallsFQDN(e.target.value)}>
                <Form.Label>Calls FQDN</Form.Label>
                <Form.Control type="text" defaultValue={hpbxServer.calls_fqdn} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Update HPBX server
            </Button>
            <ModalMessage title={error.title} body={error.body} onClose={errorHandler} show={error.show}/>
            <DeleteConfirmation showModal={deleteModal.showModal} hideModal={deleteModal.hideModal} 
            confirmModal={deleteModal.confirmModal} message={deleteModal.message}/>
          </Stack>
          </Form>
          <Button variant='danger' type="button" onClick={showDelete}>
            Delete HPBX server
          </Button>
        </Stack>
    );
  }

export default UpdateHPBXServer