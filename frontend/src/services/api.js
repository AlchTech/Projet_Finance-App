import axios from 'axios';


class Api {
    constructor() {
        this.api = axios.create({
        baseURL: 'http://localhost:3000/api/companies',
        });
    }

    async get(endpoint) {
        return this.api.get(endpoint);
    }

    async post(endpoint, data) {
        return this.api.post(endpoint, data);
    }

    async put(endpoint, data) {
        return this.api.put(endpoint, data);
    }

    async delete(endpoint) {
        return this.api.delete(endpoint);
    }
  
}

export default new Api();

