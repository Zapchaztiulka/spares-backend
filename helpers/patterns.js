const availability = ['є в наявності', 'під замовлення'];
const roles = ['public', 'user', 'admin'];

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/; // 6 characters, at least one upperCase and one lowercase

const patterns = {
  availability,
  roles,
  emailPattern,
  passwordPattern,
};

module.exports = patterns;
