import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useEffect, useState , useRef} from 'react';
import { ModalMessage } from '../../elements/modal'
import Stack from 'react-bootstrap/Stack';
import Select from 'react-select'

function CreateCarrierMonUser({fetchCarrierMonUsersData}) {
    const formRef = useRef()
    const hpbxSelectRef = useRef()
    const carrierSelectRef = useRef()
    const [carrierMonitoring, setCarrierMonitoring] = useState();
    const [hpbxServer, setHPBXServer] = useState([]);
    const [username, setUsername] = useState();
    const [deviceID, setDeviceID] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [hpbxServers, setHPBXServers] = useState([]);
    const [carrierMonitorings, setCarrierMonitorings] = useState([]);
    const [cookies, setCookies] = useCookies(['csrftoken']);
    const [error, setError] = useState({title: "", body: "", show: false});

    function resetForm(){
        setCarrierMonitoring();
        setHPBXServer();
        setUsername();
        setDeviceID();
        setPassword();
        setPhoneNumber();
        hpbxSelectRef.current.clearValue();
        carrierSelectRef.current.clearValue();
        formRef.current.reset();
    }

    function handleSubmit(e) {
      e.preventDefault();
        console.log(carrierMonitoring)
        console.log(carrierSelectRef.current)
        fetch("http://localhost:8000/api/carrier-monitoring-users", {
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
                    body: 'Carrier monitoring adding failed.',
                    show: true,
                });
              } else {
                fetchCarrierMonUsersData();
                resetForm();
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

    return (
        <Form id="carrierMonUserCreateForm" ref={formRef} method="post" onSubmit={e => {handleSubmit(e)}}>
            <Stack gap={3}>
            <Form.Group controlId="CarrierMonUserCreateForm.username" value={username} onChange={e => setUsername(e.target.value)}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" required/>
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.carrierMonitoring">
                <Form.Label>Carrier monitoring</Form.Label>
                <Select
                    isSearchable
                    isClearable
                    options={carrierMonitorings.map((carrMon) => {return {value:carrMon.id, label: carrMon.name}})}
                    onChange={(choice) => setCarrierMonitoring(choice !== null ? choice.value: null)}
                    ref={carrierSelectRef}
                />
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.hpbx_server">
                <Form.Label>HPBX server</Form.Label>
                <Select
                    isSearchable
                    isClearable
                    required
                    options={hpbxServers.map((hpbxSer) => {return {value:hpbxSer.id, label: hpbxSer.short_name}})}
                    onChange={(choice) => setHPBXServer(choice !== null ? choice.value: null)}
                    ref={hpbxSelectRef}
                />
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.device_id" value={deviceID} onChange={e => setDeviceID(e.target.value)}>
                <Form.Label>Device ID</Form.Label>
                <Form.Control type="text" required/>
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.password" value={password} onChange={e => setPassword(e.target.value)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" required/>
            </Form.Group>
            <Form.Group controlId="CarrierMonUserCreateForm.phone_number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Add carrier monitoring user
            </Button>
            <ModalMessage title={error.title} body={error.body} onClose={errorHandler} show={error.show}/>
            </Stack>
        </Form>
    );
  }

export default CreateCarrierMonUser