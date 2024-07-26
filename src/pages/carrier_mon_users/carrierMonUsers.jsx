import React, { useEffect, useState , useMemo} from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateCarrierMonUser from './carrierMonUserCreateForm'
import Stack from 'react-bootstrap/Stack';
import Paging from '../../elements/pagination'

function CarrierMonUsers() {
  const [carrierMonUsers, setCarrierMonUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMonUsers, setCurrentMonUsers] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCarrierMonUsersData()
  }, [])

  const filteredCarrierMonUsers = useMemo(() => {
    if (!searchTerm) return carrierMonUsers;
    if (carrierMonUsers.length > 0) {
      return carrierMonUsers.filter(CarrierMonUser =>{
        return (CarrierMonUser.carrier_monitoring && CarrierMonUser.carrier_monitoring.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
               CarrierMonUser.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               CarrierMonUser.hpbx_server.short_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               CarrierMonUser.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
      });
    }
  }, [carrierMonUsers, searchTerm])

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCarrierMonUsers.length / itemsPerPage))
  }, [filteredCarrierMonUsers, itemsPerPage]);

  useEffect(() => {
    if (totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    setCurrentMonUsers(filteredCarrierMonUsers.slice(currentPage*itemsPerPage-itemsPerPage, currentPage*itemsPerPage))
  },[currentPage, filteredCarrierMonUsers, itemsPerPage]);

  function fetchCarrierMonUsersData() {
    fetch("http://localhost:8000/api/carrier-monitoring-users", {credentials: 'include'})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCarrierMonUsers(data)
      })
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={1}></Col>
        <Col sm={7}>
        <h2>Carrier monitoring users list</h2>
        <Stack gap={3}>
          <Form.Group controlId="searchForm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
            <Form.Control type="text" placeholder='Start typing to search'/>
          </Form.Group>
          <Row/>
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
              {currentMonUsers.map((carrierMonUser, i) => {
                return (
                  <tr key={i}>
                    <td key={i+"_username"}><a href={"carrier-mon-users/"+carrierMonUser.id}>{carrierMonUser.user_name}</a></td>
                    {carrierMonUser.carrier_monitoring !== null 
                    ? <td key={i+"_carrier_monitoring"}> 
                        <a href={"carrier-monitorings/"+carrierMonUser.carrier_monitoring.id}>{carrierMonUser.carrier_monitoring.name}</a>
                    </td>
                    : <td></td>
                    } 
                    <td key={i+"_hpbx_server"}> 
                      <a href={"hpbx-servers/"+carrierMonUser.hpbx_server.id}>{carrierMonUser.hpbx_server.short_name}</a>
                    </td>
                    <td key={i+"_device_id"}>{carrierMonUser.device_id}</td>
                    <td key={i+"_password"}>{carrierMonUser.password}</td>
                    <td key={i+"_phone_number"}>{carrierMonUser.phone_number}</td>
                  </tr>
                )  
              })
              }
            </tbody>  
          </Table>
          <Row>
            <Col>
              <Paging totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Col>
            <Col sm={1}>
              <Form.Select onChange={e => setItemsPerPage(e.target.value)} value={itemsPerPage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </Form.Select>
            </Col>
          </Row>
          </Stack>
        </Col>
        <Col sm={3}>
          <h2>Create carrier monitoring user</h2>
          <CreateCarrierMonUser fetchCarrierMonUsersData={fetchCarrierMonUsersData}/>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  )
}

export default CarrierMonUsers