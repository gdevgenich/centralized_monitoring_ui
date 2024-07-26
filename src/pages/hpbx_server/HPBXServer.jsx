import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import UpdateHPBXServer from './hpbxServerUpdateForm'

function HPBXServer(props) {
    const params = useParams();
    const [hpbxServer, setHPBXServer] = useState([])

    useEffect(() => {
        fetchHPBXServerData()
      }, [])

    function fetchHPBXServerData() {
        fetch("http://localhost:8000/api/hpbx-servers/"+params.id, {credentials: 'include'})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setHPBXServer(data)
          })
      }
    
    if (Object.keys(hpbxServer).length > 1) {
    return (
        <Container fluid>
            <Row>
                <Col sm={1}></Col>
                <Col sm={7}>
                <Table responsive bordered striped>
                    <thead>
                    <tr>
                        <th>Short name</th>
                        <th>API fqdn</th>
                        <th>Calls fqdn</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{hpbxServer.short_name}</td>
                            <td>{hpbxServer.api_fqdn}</td>
                            <td>{hpbxServer.calls_fqdn}</td>
                        </tr>
                    </tbody>  
                </Table>
                </Col>
                {Object.keys(hpbxServer).length !== 0 &&
                <Col sm={3}>
                    <h2>Update HPBX server data</h2>
                    <UpdateHPBXServer fetchHPBXServerData={fetchHPBXServerData} hpbxServer={hpbxServer}/>
                </Col>}
                <Col sm={1}></Col>
            </Row>
        </Container>
    )
    } else if (hpbxServer.detail === "Not found."){
        return(
        <Container>
            <h2>HPBX server with id {params.id} not found</h2>
        </Container>
        )
    }
}

export default HPBXServer