import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Headers.js';


function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
      api.get('projects').then(response => {
          setProjects(response.data);
      });
    }, []);

  async function handleAddProjects(){
    //setProjects([...projects, `Novo projeto ${Date.now()}`])
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Cássio Rovaroto"
    });
    const project = response.data;

    setProjects([...projects, project]);
  }

  return ( 
    /* fragment, para evitar criação de HTML redundante*/
    <> 
      <Header title="Projects">
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>

        <button type="button" onClick={handleAddProjects}>Adicionar Projeto</button>
      </Header> 
    </>
  );
}

export default App;