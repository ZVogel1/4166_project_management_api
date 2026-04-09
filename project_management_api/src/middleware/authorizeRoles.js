export function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    const normalizedAllowedRoles = allowedRoles.map((role) =>
      typeof role === 'string' ? role.toUpperCase() : role,
    );
    const normalizedUserRole =
      typeof req.user?.role === 'string' ? req.user.role.toUpperCase() : '';

    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
      const error = new Error('Forbidden: insufficient permission');
      error.status = 403;
      return next(error);
    }
    return next();
  };
}
