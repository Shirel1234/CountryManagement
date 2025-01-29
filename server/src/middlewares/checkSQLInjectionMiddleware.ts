import { Request, Response, NextFunction, RequestHandler } from "express";

// Middleware to check for SQL injection patterns in request URL and body
const checkSQLInjection: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const patterns = [
    /union.*select/i, // Checks for SQL UNION SELECT
    /select.*from/i, // Checks for SELECT FROM
    /drop.*table/i, // Checks for DROP TABLE
    /--/i, // Checks for SQL comment syntax
    /\*/i, // Checks for wildcard *
  ];

  for (const pattern of patterns) {
    if (pattern.test(req.url) || pattern.test(JSON.stringify(req.body))) {
      res.status(400).json({ message: "Potential SQL Injection detected" });
      return;
    }
  }

  next();
};

export default checkSQLInjection;
