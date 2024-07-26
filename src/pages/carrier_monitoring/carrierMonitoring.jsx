import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import UpdateCarrierMonitoring from './carrierMonitoringUpdateForm'

function CarrierMonitoring(props) {
    const params = useParams();
    const [carrierMonitoring, setCarrierMonitoring] = useState({})
    const [monitoringUsers, setMonitoringUsers] = useState([])

    useEffect(() => {
        fetchCarrierMonitoringData();
        fetchMonitoringUsersData();
      }, [])

    const fetchCarrierMonitoringData = async() => {
        await fetch("http://localhost:8000/api/carrier-monitorings/"+params.id, {credentials: 'include'})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setCarrierMonitoring(data)
          })
      }
    
      function fetchMonitoringUsersData() {
        fetch("http://localhost:8000/api/carrier-monitoring-users?carrier="+params.id, {credentials: 'include'})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setMonitoringUsers(data)
          })
      }
    if (Object.keys(carrierMonitoring).length > 1) {
    return (
        <Container fluid>
            <Row>
                <Col sm={1}></Col>
                <Col sm={7}>
                    <h2>Monitoring server data</h2>
                    <Table responsive bordered striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Carrier</th>
                                <th>Monitoring server</th>
                                <th>Last check</th>
                                <th>Active</th>
                                <th>Alert</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td key={"name"}>{carrierMonitoring.name}</td>
                            <td key={"carrier"}>{carrierMonitoring.carrier}</td>
                            <td key={"mon_server"}>{carrierMonitoring.mon_server}</td>
                            <td key={"last_check"}>{carrierMonitoring.last_check}</td>
                            <td key={"active"}>{carrierMonitoring.active.toString()}</td>
                            <td key={"alert"}>{carrierMonitoring.alert.toString()}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <h2>Carrier monitoring users</h2>
                    <Table responsive bordered striped>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Carrier monitoring</th>
                                <th>HPBX server</th>
                                <th>Device ID</th>
                                <th>Password</th>
                                <th>Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monitoringUsers.map((user, i) => {
                                return (
                                <tr key={i}>
                                    <td key={i+"_username"}> 
                                    <a href={"/carrier-monitoring-users/"+user.id}>{user.user_name}</a>
                                    </td>
                                    <td key={i+"carier_monitoring"}>{user.carrier_monitoring.name}</td>
                                    <td key={i+"_hpbx_server"}>{user.hpbx_server.short_name}</td>
                                    <td key={i+"_device_id"}>{user.device_id}</td>
                                    <td key={i+"_password"}>{user.password}</td>
                                    <td key={i+"_phone_number"}>{user.phone_number}</td>
                                </tr>
                                )  
                            })
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col sm={3}>
                    <h2>Update carrier monitoring server</h2>
                    <UpdateCarrierMonitoring carrierMonitoring={carrierMonitoring} fetchCarrierMonitoringData={fetchCarrierMonitoringData}/>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </Container>
    )
    } else if (carrierMonitoring.detail === "Not found."){
        return(
        <Container>
            <h2>Carrier monitoring with id {params.id} not found</h2>
        </Container>
        )
    }
}

export default CarrierMonitoring