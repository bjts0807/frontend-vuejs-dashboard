import Service from './Service';

const baseUrl = '/clients';

const create = (obj) => {
    return Service.post(`${baseUrl}/register`,obj);
};

export { create };

