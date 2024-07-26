import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import HPBXServers from './pages/hpbx_servers/HPBXServers'
import HPBXServer from './pages/hpbx_server/HPBXServer'
import CarrierMonitorings from './pages/carrier_monitorings/carrierMonitorings'
import CarrierMonitoring from './pages/carrier_monitoring/carrierMonitoring'
import CarrierMonUsers from './pages/carrier_mon_users/carrierMonUsers'
import CarrierMonUser from './pages/carrier_mon_user/carrierMonUser'
import NavigationBar from './components/NavigationBar'
import Header from './components/Header'
import { CookiesProvider } from 'react-cookie';
import Stack from 'react-bootstrap/Stack';

const App = () => {
   return (
    <Stack gap={3}>
    <CookiesProvider defaultSetCookies={{ path: '/' }}>
      <BrowserRouter>
          <NavigationBar/>
          <Routes>
            <Route path="home" element={<Home/>}/>
            <Route path="hpbx-servers" element={<HPBXServers/>}/>
            <Route path="hpbx-servers/:id" element={<HPBXServer/>}/> 
            <Route path="carrier-monitorings" element={<CarrierMonitorings/>}/>
            <Route path="carrier-monitorings/:id" element={<CarrierMonitoring/>}/>
            <Route path="carrier-mon-users" element={<CarrierMonUsers/>}/>
            <Route path="carrier-mon-users/:id" element={<CarrierMonUser/>}/>
          </Routes>
      </BrowserRouter>
    </CookiesProvider>
    </Stack>
   )
 }
 export default App
 