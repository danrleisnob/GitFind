import { useState } from 'react';
import './App.css'
import Header from './components/header/Header'
import background from './assets/background.svg'
import ItemList from './components/ItemList/ItemList'

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  
  const handleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, login, bio,} = newUser;
      setCurrentUser({avatar_url, name, login, bio,});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  return (
      <div>
        <Header />

        <div className='conteudo'>
          <img className='background' src={background} alt="background-img" />
        
        <div className='info'>
          <div>
          <input
            name='usuario'
            value={user}
            onChange={event=> setUser(event.target.value)}
            type="text"
            placeholder='@username'/>
          <button onClick={handleGetData}>Buscar</button>
        </div>
        {currentUser?.name ? (<>
            <div className='perfil'>
            <img src={currentUser.avatar_url} className='profile' alt="profile" />
          <div>
            <h3>{currentUser.name}</h3>
            <span>@{currentUser.login}</span>
            <p>{currentUser.bio}</p>
          </div>
          </div>
          <hr/>
        </>
        ): null}
        {repos?.length ? (
          <div>
          <h4 className='repositorio'>Repositórios</h4>
            {repos.map(repo =>(
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <ItemList title={repo.name} description={repo.description} />
            </a>
            ))};
        </div>
        ): null} 
        <hr/>
        </div>
        </div>
      </div>
  )
}

export default App
