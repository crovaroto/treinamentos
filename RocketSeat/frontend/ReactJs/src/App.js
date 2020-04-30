import React, { useState } from 'react';
import Header from './components/Headers.js';

function App() {
  const [ projects, setProjects ] = useState(['Desenvolvimento de apps', 'Front-end web']);

  function handleAddProjects(){
    setProjects([...projects, `Novo projeto ${Date.now()}`])
  }

  return ( 
    /* fragment, para evitar criação de HTML redundante*/
    <> 
      <Header title="Projects">
        <ul>
          {projects.map(project => <li key={project}>{project}</li>)}
        </ul>

        <button type="button" onClick={handleAddProjects}>Adicionar Projeto</button>
      </Header> 
    </>
  );
}

export default App;