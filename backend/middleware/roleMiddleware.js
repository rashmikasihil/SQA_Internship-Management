// middleware/roleMiddleware.js
export const verifyRole = (requiredRoles) => {
    return (req, res, next) => {
      try {
        if (!req.user || !req.user.role) {
          return res.status(403).json({ message: "Role is missing or user not authenticated" });
        }
  
        if (!requiredRoles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied" });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    };
  };
  
  