import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
  return (
    <>
      <Navbar bg="success" data-bs-theme="dark" sticky='top'>
        <Container>
          <Nav>
          <NavDropdown title="Monitorings" id="monitoringsDropdown">
              <NavDropdown.Item href="/carrier-monitorings">Carrier monitorings</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Servers" id="serversDropdown">
              <NavDropdown.Item href="/hpbx-servers">HPBX Servers</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Users" id="usersDropdown">
              <NavDropdown.Item href="/carrier-mon-users">Carrier monitoring users</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container> 
      </Navbar>
    </>
  );
}

export default NavigationBar;