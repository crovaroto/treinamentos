const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase(method)}] ${url}`;

  console.log(logLabel)

  return next();
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json( { error: 'Project ID not found.' } );
  }

  return next();  
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {

  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title } = request.body;

  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;

  const project = { id: uuid(), title, owner }; 

  projects.push(results);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    response.status(400).json({ error: 'Project not found.' });
  }

  const project = {
    id,
    title, 
    owner,
  }

  projects[projectIndex] = project;
   
  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0 ) {
   return response.status(400).json( { error : 'Project not found.' } );
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();

});

app.listen(3333, () => {
  console.log('Back-end started!')
});