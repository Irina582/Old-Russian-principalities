const principalitiesService = require('../services_principalities/service_principalities');

const getAll = (req, res) => {
    const { title } = req.query;
    const principalities = principalitiesService.findAll(title);
    res.json(principalities);
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const principality = principalitiesService.findOne(id);
    
    if (!principality) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(principality);
};

const create = (req, res) => {
    const { src, title, text } = req.body;
    
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newPrincipality = principalitiesService.create({ src, title, text });
    res.status(201).json(newPrincipality);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPrincipality = principalitiesService.update(id, req.body);
    
    if (!updatedPrincipality) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(updatedPrincipality);
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const success = principalitiesService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.status(204).send();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};