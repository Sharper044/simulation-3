export default {
  prefix: 'http://localhost:3030',
  login: '/api/auth/login',
  authenticate: '/api/auth/authenticated',
  logout: '/api/auth/logout',
  friendList: '/api/friend/list',
  addFriend: '/api/friend/add',
  unFriend: '/api/friend/remove',
  updateUser: '/api/user/patch/:id',
  twentyFourUsers: '/api/user/list',
  search: '/api/user/search',
  recomended: '/api/recommended',
  addRecomendedFriend: '/api/recommended/add'
}