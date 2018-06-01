import env from '../build/env';

export default env === 'development' ?
    'https://192.168.112.56/api/' :
    location.protocol + '//' + location.hostname + ':' + location.port + '/api/';
