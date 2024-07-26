import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import UpdateHPBXServer from './carrierMonUserUpdateForm'

function CarrierMonUser(props) {
    const params = useParams();
    const [carrierMonUser, setCarrierMonUser] = useState([])

    useEffect(() => {
      fetchCarrierMonUserData()
      }, [])

    function fetchCarrierMonUserData() {
        fetch("http://localhost:8000/api/carrier-monitoring-users/"+params.id, {credentials: 'include'})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setCarrierMonUser(data)
          })
      }
    
    if (Object.keys(carrierMonUser).length > 1) {
    return (
        <Container fluid>
            <Row>
                <Col sm={1}></Col>
                <Col sm={7}>
                <Table responsive bordered striped>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>HPBX server</th>
                        <th>Carrier monitoring</th>
                        <th>Device ID</th>
                        <th>Password</th>
                        <th>Phone number</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{carrierMonUser.user_name}</td>
                            <td><a href={"/hpbx-servers/"+carrierMonUser.hpbx_server.id}>{carrierMonUser.hpbx_server.short_name}</a></td>
                            { carrierMonUser.carrier_monitoring !== null
                            ? <td><a href={"/carrier-monitorings/"+carrierMonUser.carrier_monitoring.id}>{carrierMonUser.carrier_monitoring.name}</a></td>
                            : <td></td>
                            }
                            <td>{carrierMonUser.device_id}</td>
                            <td>{carrierMonUser.password}</td>
                            <td>{carrierMonUser.phone_number}</td>
                        </tr>
                    </tbody>  
                </Table>
                </Col>
                {Object.keys(carrierMonUser).length !== 0 &&
                <Col sm={3}>
                    <h2>Update carrier monitoring user</h2>
                    <UpdateHPBXServer fetchCarrierMonUserData={fetchCarrierMonUserData} carrierMonUser={carrierMonUser}/>
                </Col>}
                <Col sm={1}></Col>
            </Row>
        </Container>
    )
    } else if (CarrierMonUser.detail === "Not found."){
        return(
        <Container>
            <h2>Carrier monitoring user with id {params.id} not found</h2>
        </Container>
        )
    }
}

export default CarrierMonUser