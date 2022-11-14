import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';

function App() {
  const [ user, setUser ] = useState({});

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signinDiv").hidden = true;
  }

  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }
 
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "415469287625-ujfk03na53beetrc3fd1m6ehv9lbb1ui.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    
    window.google.accounts.id.renderButton(
      document.getElementById("signinDiv"), {theme: "outline", size: "large"}
    )
  }, []);
  return (
    <div className="App">
      <div id="signinDiv" className='signin'></div>
        <div className="user">
          { user && 
          <>
            <img src={user.picture} />
            <h3>{user.name}</h3>
          </>
          }
          { Object.keys(user).length != 0 && 
            <button onClick={(e) => handleSignOut(e)}>Log out</button>
          }
        </div>
    </div>
  );
}

export default App;
