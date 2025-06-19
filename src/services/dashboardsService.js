import Service from './Service';

const baseUrl = '/dashboards';

const createDashboard = (obj) => {
    return Service.post(`${baseUrl}/create`,obj);
};

const getAll=()=>{
    return Service.get(`${baseUrl}/list`)
}

const show=(id)=>{
    return Service.get(`${baseUrl}/show/${id}`)
}

const updateDashboard = (id,obj) => {
    return Service.patch(`${baseUrl}/update/${id}`,obj);
};

export { createDashboard, getAll, show, updateDashboard };

