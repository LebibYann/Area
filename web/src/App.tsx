import Login from './authenticator/Login';
import Register from './authenticator/Register';
import Services from './services/index';
import NavigationHeader from './appHeader';
import { Route, Routes } from 'react-router-dom';
import OAuth from './authenticator/OAuth';
import DownloadApk from './DownloadApk';

const App = (): JSX.Element => {
  return (
    <div>
      <NavigationHeader/>
      <main>
        <Routes>
          <Route path="/" element={<Services/>}/>
          <Route path="/join" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/login/auth/:id/*" element={<OAuth/>}/>
          <Route path='/client.apk' element={<DownloadApk/>}/>
        </Routes>
      </main>
    </div>
  );
};
export default App;
