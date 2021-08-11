import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.15.52:3333",
  // baseURL: "http://192.168.15.52:3333", //Meu note - Trocar também no package.json
  // baseURL: 'http://192.168.101.82:3333', //A1214 - Trocar também no package.json
});

export {api};