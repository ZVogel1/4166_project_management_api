import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({ 
    windowMs: 1*60*1000,
    limit: process.env.NODE_ENV === 'test' ? 1000 : 3,
    handler: (req, res, next) => {
        const err = new Error('Too many login requests, please try again later.');
        err.status = 429;
        next(err);
    }
});