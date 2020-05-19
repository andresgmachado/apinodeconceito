const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

function ChecarProjectExists(req, res, next){
    const { id} = req.params;
    const project = projects.find(p => p.id == id);

    if (!project){
        return res.status(400).json({erro: 'Projeto não encontrado'});
    }
    return next();
}

function Logrequests(req, res, next){
    console.count("Numero de requisições");
    return next();
}

server.get('/projects/',(req,res)=>{
    return res.json(projects);
});

server.post('/projects/',(req,res)=>{
    const {id, title, tasks} = req.body;

    const project ={
        id,
        title,
        task: tasks
    };

    projects.push(project);
    return res.json(projects);

});

server.put('/projects/:id',ChecarProjectExists,(req, res)=>{
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);
    project.title = title;

    return res.json(project);
});

server.delete('/projects/:id',ChecarProjectExists,(req,res)=>{
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);
    return res.send();

});

server.post('projects/:id/tasks', ChecarProjectExists,(req,res)=>{
    const { id } = req.params;
    const { title } = req.body;

    const project = projects(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);