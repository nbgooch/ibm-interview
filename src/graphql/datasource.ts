import { RESTDataSource } from 'apollo-datasource-rest';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;
  }

  getUsers() {
    return this.get('/user');
  }
  getUserById(id) {
    return this.get(`/user/${id}`);
  }
  createUser(user) {
    return this.post('/user', user);
  }
}

export default UserAPI;
