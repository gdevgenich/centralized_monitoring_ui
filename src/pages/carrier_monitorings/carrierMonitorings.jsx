import React, { useEffect, useState , useMemo} from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateCarrierMonitoring from './carrierMonitoringCreateForm'
import Stack from 'react-bootstrap/Stack';
import Paging from '../../elements/pagination'

function CarrierMonitorings() {
  const [carrierMonitorings, setCarrierMonitorings] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMonitorings, setCurrentMonitorings] = useState([])
  const [sortTerms, setSortTerms] = useState({key:"id", order:1})
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCarrierMonitoringsData()
  }, [])

  const filteredCarrierMonitorings = useMemo(() => {
    if (!searchTerm) return carrierMonitorings.sort((a,b) => a[sortTerms.key] > b[sortTerms.key] ? sortTerms.order*1 : sortTerms.order*-1);
    if (carrierMonitorings.length > 0) {
      return carrierMonitorings.filter(carrierMonitoring =>{
        return carrierMonitoring.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               carrierMonitoring.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
               carrierMonitoring.mon_server.toLowerCase().includes(searchTerm.toLowerCase())
      }).sort((a,b) => a[sortTerms.key] > b[sortTerms.key] ? sortTerms.order*1 : sortTerms.order*-1);
    }
  }, [carrierMonitorings, searchTerm, sortTerms])

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCarrierMonitorings.length / itemsPerPage));
  }, [filteredCarrierMonitorings, itemsPerPage]);

  useEffect(() => {
    if (totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    setCurrentMonitorings(filteredCarrierMonitorings.slice(currentPage*itemsPerPage-itemsPerPage, currentPage*itemsPerPage))
  },[currentPage, filteredCarrierMonitorings, itemsPerPage, sortTerms]);

  function fetchCarrierMonitoringsData() {
    fetch("http://localhost:8000/api/carrier-monitorings", {credentials: 'include'})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCarrierMonitorings(data)
      })
  }

  function sort(e){
    let key = e.target.id
    let thElement = document.getElementById(key)
    if (sortTerms.key !== "id"){
      document.getElementById(sortTerms.key).style.textDecoration = ""
    }

    if (key === sortTerms.key){
      if (sortTerms.order === 1){
        thElement.style.textDecoration = "overline"
      } else {
        thElement.style.textDecoration = "underline"
      }
      setSortTerms({key:key, order: sortTerms.order*-1})
    } else {
      setSortTerms({key:key, order: 1})
      thElement.style.textDecoration = "underline"
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={1}></Col>
        <Col sm={7}>
        <h2>Carrier monitorings list</h2>
        <Stack gap={3}>
          <Form.Group controlId="searchForm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
            <Form.Control type="text" placeholder='Start typing to search'/>
          </Form.Group>
          <Row/>
          <Table responsive bordered striped>
            <thead>
              <tr onClick={e => sort(e)}>
                <th id="name" >Name</th>
                <th id="carrier" >Carrier</th>
                <th id="mon_server" >Monitoring server</th>
                <th id="last_check" >Last check</th>
                <th id="active" >Active</th>
                <th id="alert" >Alert</th>
              </tr>
            </thead>
            <tbody>
              {currentMonitorings.map((carrierMonitoring, i) => {
                return (
                  <tr key={i}>
                    <td key={i+"_name"}> 
                      <a href={"carrier-monitorings/"+carrierMonitoring.id}>{carrierMonitoring.name}</a>
                    </td>
                    <td key={i+"_carrier"}>{carrierMonitoring.carrier}</td>
                    <td key={i+"_mon_server"}>{carrierMonitoring.mon_server}</td>
                    <td key={i+"_last_check"}>{carrierMonitoring.last_check}</td>
                    <td key={i+"_active"}>{carrierMonitoring.active.toString()}</td>
                    <td key={i+"_alert"} color={carrierMonitoring.alert ? 'black' : 'red' }>{carrierMonitoring.alert.toString()}</td>
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
          <h2>Create carrier monitoring</h2>
          <CreateCarrierMonitoring fetchCarrierMonitoringsData={fetchCarrierMonitoringsData}/>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  )
}
export default CarrierMonitorings