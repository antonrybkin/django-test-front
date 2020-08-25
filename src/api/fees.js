import httpClient from './httpClient';

const getAllFees = () => httpClient.get('/api/bank/account/');

const getAllTransactions = () => httpClient.get('/api/bank/transaction/');

const createFee = () => httpClient.post('/api/bank/account/');

const pay = (payload) => httpClient.post('/api/bank/action/', payload);

const spend = (payload) => httpClient.post('/api/bank/transaction/', payload);

const del = (id) => httpClient.delete(`/api/bank/account/${id}/`);

export {
    getAllFees,
    getAllTransactions,
    createFee,
    pay,
    spend,
    del
}