import { useState } from 'react';
import './App.css';
function App() {
const [username, setUsername] = useState('');
const [user, setUser] = useState(null);
function getUser() {
if (!username) return;
fetch(`https://api.github.com/users/${username}`)
.then(res => res.json())
.then(data => setUser(data.message ? 'error' : data))
.catch(() => setUser('error'));
}
return (
  <div id="container">
    <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/github.png" alt="github"/><br />
    <i><h1>Github Dev Finder</h1></i>

    <input
      id="username"
      placeholder="Enter github username.."
      value={username}
      onChange={e => setUsername(e.target.value)}
    />
    <button id="search" onClick={getUser}>Search</button>

    <div id="profile">
      {user === 'error' && <p className="error">User not found or error occurred.</p>}

      {user && user !== 'error' && (
        <div className="profile-info">
          <img src={user.avatar_url} alt="Profile" />
          <h2>{user.name || 'No Name'}</h2>
          <p>{user.bio || 'No bio available'}</p>
          <p>Followers: {user.followers} | Following: {user.following}</p>
          <p>Public Repositories: {user.public_repos}</p>
          <div className="button-group">
            <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
            <button className="clear-btn" onClick={() => {
              setUsername('');
              setUser(null);
            }}>Clear All</button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
export default App;
