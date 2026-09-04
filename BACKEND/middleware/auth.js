const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  // token is expected in the Authorization header, formatted as: "Bearer <token>"
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, access denied' })
  }

  const token = authHeader.split(' ')[1] // splits "Bearer xyz123" into ["Bearer", "xyz123"], we want index 1

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // attach the decoded payload ({ id, role }) to the request
    next() // move on to the actual route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

module.exports = { protect, adminOnly }