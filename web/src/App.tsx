import Login from './authenticator/Login';
import Register from './authenticator/Register';
import Services from './services/Services';
import NavigationHeader from './NavigationHeader';
import { Route, Routes } from 'react-router-dom';
import Callback from './authenticator/Callback';
import DownloadApk from './DownloadApk';
import Create from './services/Create';
import Applets from './services/Applets';
import Join from './authenticator/Join';
import Settings from './authenticator/Settings';
import ServiceDetails from './services/ServiceDetails';

const App = (): JSX.Element => {
  return (
    <section>
      <NavigationHeader/>
      <main>
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path='/:id' element={<ServiceDetails/>}/>
          <Route path="/join" element={<Join/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/my_applets" element={<Applets/>}/>
          <Route path="/my_applets/:id/*" element={<Applets/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/login/auth/:id/*" element={<Callback/>}/>
          <Route path='/client.apk' element={<DownloadApk/>}/>
        </Routes>
      </main>
    </section>
  );
};
export default App;
