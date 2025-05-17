const {  User, Rol } = require("../database/models");

const checkAdminRole = async (req, res, next) => {
  try {
    const userId = req.session.user.id;

    if (!userId) {
        
      return res.redirect('/users/login');
    }

    const user = await User.findByPk(userId, {
      include: [{ model: Rol, as: 'rol' }]
    });

    if (!user) {
      return res.redirect('/users/login');
    }

    if (user.rolId !== 1) {
      return res.redirect('/users/profile/' + userId);
    }

    next();
  } catch (err) {
    console.error('Error en middleware checkAdminRole:', err);
    //res.status(500).json({ message: 'Error de sesión, éste úsuario no es administrador' });
    return res.redirect('/products')
  }
};

module.exports = checkAdminRole;
module.exports = {checkAdminRole}