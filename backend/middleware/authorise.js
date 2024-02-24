const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'secret_this_should_be_longerr');
	req.userData = {
  	userId: decodedToken.userId,
  	username: decodedToken.username,
  	userRole: decodedToken.userRole,
	};
	console.log(req.userData);

	next();
  } catch (error) {
	res.status(401).json({ message: 'authorization failed!' });
  }
};
