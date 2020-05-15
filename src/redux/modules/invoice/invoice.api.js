import axios from 'axios';

export const fetchItems = () =>
  axios(
    'http://www.mocky.io/v2/5e9bc40a3300009332bf1814?mocky-delay=1000ms'
  ).then(({ data }) => data);
