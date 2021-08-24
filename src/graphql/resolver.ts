const resolvers = {
  Query: {
    getUserById: (_, { id }, { dataSources }) => {
      return dataSources.user.getUserById(id);
    },
    getUsers: (_, __, { dataSources }) => {
      return dataSources.user.getUsers();
    },
  }
};

export default resolvers;
