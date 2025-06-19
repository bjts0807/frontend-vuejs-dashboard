import Service from './Service';

const baseUrl = '/data-clients';

const getDataInfoSale = () => {
    return Service.get(`${baseUrl}/info/sale`);
};

const getDataProducts = () => {
    return Service.get(`${baseUrl}/list/products`);
};

const getDataSales = () => {
    return Service.get(`${baseUrl}/list/sales`);
};
export { getDataInfoSale, getDataProducts, getDataSales };

