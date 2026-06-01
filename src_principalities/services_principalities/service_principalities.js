const fileService = require('./fileService_principalities');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const principalities = fileService.readData(dataFilePath);
    if (title) {
        return principalities.filter(principality => 
            principality.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return principalities;
};

const findOne = (id) => {
    const principalities = fileService.readData(dataFilePath);
    return principalities.find(principality => principality.id === id);
};

const create = (principalityData) => {
    const principalities = fileService.readData(dataFilePath);
    
    const newId = principalities.length > 0 
        ? Math.max(...principalities.map(p => p.id)) + 1 
        : 1;
        
    const newPrincipality = { id: newId, ...principalityData };
    principalities.push(newPrincipality);
    fileService.writeData(dataFilePath, principalities);
    
    return newPrincipality;
};

const update = (id, principalityData) => {
    const principalities = fileService.readData(dataFilePath);
    const index = principalities.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    principalities[index] = { ...principalities[index], ...principalityData };
    fileService.writeData(dataFilePath, principalities);
    
    return principalities[index];
};

const remove = (id) => {
    const principalities = fileService.readData(dataFilePath);
    const filtered = principalities.filter(p => p.id !== id);
    
    if (filtered.length === principalities.length) {
        return false;
    }
    
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };