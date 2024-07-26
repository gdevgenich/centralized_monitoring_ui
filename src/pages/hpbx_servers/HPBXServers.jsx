import React, { useEffect, useState , useMemo} from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateHPBXServer from './hpbxServerCreateForm'
import Stack from 'react-bootstrap/Stack';
import Paging from '../../elements/pagination'

function HPBXServers() {
  const [hpbxServers, setHPBXServers] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentServers, setCurrentServers] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchHPBXServersData()
  }, [])

  const filteredHPBXServers = useMemo(() => {
    if (!searchTerm) return hpbxServers;
    if (hpbxServers.length > 0) {
      return hpbxServers.filter(hpbxServer =>{
        return hpbxServer.short_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               hpbxServer.api_fqdn.toLowerCase().includes(searchTerm.toLowerCase()) ||
               hpbxServer.calls_fqdn.toLowerCase().includes(searchTerm.toLowerCase())
      });
    }
  }, [hpbxServers, searchTerm])

  useEffect(() => {
    setTotalPages(Math.ceil(filteredHPBXServers.length / itemsPerPage));
  }, [filteredHPBXServers, itemsPerPage]);

  useEffect(() => {
    if (totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    setCurrentServers(filteredHPBXServers.slice(currentPage*itemsPerPage-itemsPerPage, currentPage*itemsPerPage))
  },[currentPage, filteredHPBXServers, itemsPerPage]);

  function fetchHPBXServersData() {
    fetch("http://localhost:8000/api/hpbx-servers", {credentials: 'include'})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setHPBXServers(data)
      })
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={1}></Col>
        <Col sm={7}>
        <h2>HPBX servers list</h2>
        <Stack gap={3}>
          <Form.Group controlId="searchForm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
            <Form.Control type="text" placeholder='Start typing to search'/>
          </Form.Group>
          <Row/>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>Short name</th>
                <th>API fqdn</th>
                <th>Calls fqdn</th>
              </tr>
            </thead>
            <tbody>
              {currentServers.map((hpbxServer, i) => {
                return (
                  <tr key={i}>
                    <td key={i+"_name"}> 
                      <a href={"hpbx-servers/"+hpbxServer.id}>{hpbxServer.short_name}</a>
                    </td>
                    <td key={i+"_api"}>{hpbxServer.api_fqdn}</td>
                    <td key={i+"_calls"}>{hpbxServer.calls_fqdn}</td>
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
          <h2>Create HPBX server</h2>
          <CreateHPBXServer fetchHPBXServersData={fetchHPBXServersData}/>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  )
}
export default HPBXServers