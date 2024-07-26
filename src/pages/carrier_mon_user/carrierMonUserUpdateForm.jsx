import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { ModalMessage, DeleteConfirmation } from '../../elements/modal'
import Stack from 'react-bootstrap/Stack';
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'

function UpdateCarrierMonUser({fetchCarrierMonUserData, carrierMonUser}) {
    const [carrierMonitoring, setCarrierMonitoring] = useState(carrierMonUser.carrier_monitoring !== null ? carrierMonUser.carrier_monitoring.id : null);
    const [hpbxServer, setHPBXServer] = useState(carrierMonUser.hpbx_server.id);
    const [username, setUsername] = useState(carrierMonUser.user_name);
    const [deviceID, setDeviceID] = useState(carrierMonUser.device_id);
    const [password, setPassword] = useState(carrierMonUser.password);
    const [phoneNumber, setPhoneNumber] = useState(carrierMonUser.phone_number);
    const [hpbxServers, setHPBXServers] = useState([]);
    const [carrierMonitorings, setCarrierMonitorings] = useState([]);
    const [cookies, setCookies] = useCookies(['csrftoken']);
    const [deleteModal, setDeleteModal] = useState({showModal: false, hideModal: "", confirmModal: "", message: ""});
    const navigate = useNavigate()
    const [error, setError] = useState({title: "", body: "", show: false});

    function handleSubmit(e) {
      e.preventDefault();
        fetch("http://localhost:8000/api/carrier-monitoring-users/"+carrierMonUser.id, {
            method: 'POST',
            credentials: 'include',
            headers:{'X-CSRFTOKEN': cookies.csrftoken,
                     'Content-Type': 'application/json'},
            body: JSON.stringify({
                "carrier_monitoring": carrierMonitoring,
                "hpbx_server": hpbxServer,
                "user_name": username,
                "device_id": deviceID,
                "password": password,
                "phone_number": phoneNumber,
            })
        })
            .then((response) => {if (!response.ok) {
                setError({
                    title: '',
                    body: 'Carrier monitoring user update failed.',
                    show: true,
                });
              } else {
                fetchCarrierMonUserData();
                }})
            .catch((err) => {console.log({err});
        });
    }

    const errorHandler = () => {
        setError({show : false});
    }

    useEffect(() =>{
        fetchHPBXServersData()
        fetchCarrierMonitoringsData()
    }, [])

    function fetchHPBXServersData() {
        fetch("http://localhost:8000/api/hpbx-servers", {credentials: 'include'})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setHPBXServers(data)
          })
      }
    
    function fetchCarrierMonitoringsData() {
    fetch("http://localhost:8000/api/carrier-monitorings", {credentials: 'include'})
        .then(response => {
        return response.json()
        })
        .then(data => {
        setCarrierMonitorings(data)
        })
    }
    
    function hanleDelete(e) {
        e.preventDefault();
        fetch("http://localhost:8000/api/carrier-monitoring-users/"+carrierMonUser.id, {
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
                    body: 'Carrier monitoring user deletion failed.',
                    show: true,
                });
              } else {navigate("/carrier-mon-users")}})
            .catch((err) => {console.log("ERROR");
        });
    }

    const hideDelete = () => {
        setDeleteModal({showModal: false});
    }

    const showDelete = () => {
        setDeleteModal({showModal: true, hideModal: hideDelete, confirmModal: hanleDelete, message: "Delete carrier monitoring user?"});
    }

    return (
        <Stack gap={3}>
        <Form id="carrierMonUserCreateForm" method="post" onSubmit={e => {handleSubmit(e)}}>
            <Stack gap={3}>
            <Form.Group controlId="CarrierMonUserCreateForm.username" value={username} onChange={e => setUsername(e.target.value)}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={username} required/>
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.carrierMonitoring">
                <Form.Label>Carrier monitoring</Form.Label>
                <Select
                    isSearchable
                    isClearable
                    options={carrierMonitorings.map((carrMon) => {return {value:carrMon.id, label: carrMon.name}})}
                    onChange={(choice) => setCarrierMonitoring(choice !== null ? choice.value: null)}
                    defaultValue={carrierMonUser.carrier_monitoring !== null ? {label:carrierMonUser.carrier_monitoring.name} : null}
                />
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.hpbx_server">
                <Form.Label>HPBX server</Form.Label>
                <Select
                    isSearchable
                    isClearable
                    options={hpbxServers.map((hpbxSer) => {return {value:hpbxSer.id, label: hpbxSer.short_name}})}
                    onChange={(choice) => setHPBXServer(choice !== null ? choice.value: null)}
                    defaultValue={{label:carrierMonUser.hpbx_server.short_name}}
                    required
                />
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.device_id" value={deviceID} onChange={e => setDeviceID(e.target.value)}>
                <Form.Label>Device ID</Form.Label>
                <Form.Control type="text" defaultValue={deviceID} required/>
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.password" value={password} onChange={e => setPassword(e.target.value)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" defaultValue={password} required/>
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.phone_number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" defaultValue={phoneNumber} required/>
            </Form.Group>
            <Button variant="primary" type="submit" active={hpbxServer !== null}>
                Update Carrier monitoring user
            </Button>
            <ModalMessage title={error.title} body={error.body} onClose={errorHandler} show={error.show}/>
            <DeleteConfirmation showModal={deleteModal.showModal} hideModal={deleteModal.hideModal} 
            confirmModal={deleteModal.confirmModal} message={deleteModal.message}/>
            </Stack>
        </Form>
        <Button variant='danger' type="button" onClick={showDelete}>
            Delete Carrier monitoring user
        </Button>
        </Stack>
    );
  }

export default UpdateCarrierMonUser