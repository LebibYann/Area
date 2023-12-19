import Login from './authenticator/Login';
import Register from './authenticator/Register';
import Services from './services/Services';
import NavigationHeader from './NavigationHeader';
import { Route, Routes } from 'react-router-dom';
import OAuth from './authenticator/OAuth';
import DownloadApk from './DownloadApk';
import Create from './services/Create';
import Applets from './services/Applets';

const App = (): JSX.Element => {
  return (
    <section>
      <NavigationHeader/>
      <main>
        <Routes>
          <Route path="/" element={<Services/>}/>
          <Route path="/join" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/my_applets" element={<Applets/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/login/auth/:id/*" element={<OAuth/>}/>
          <Route path='/client.apk' element={<DownloadApk/>}/>
        </Routes>
      </main>
    </section>
  );
};
export default App;
