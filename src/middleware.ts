import { NextApiRequest, NextApiResponse } from 'next';
import { clerkMiddleware } from '@clerk/nextjs/server';

const publicRoutes = [
  '/',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success',
];

const ignoredRoutes = [
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
];

const customMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const url = req.url?? ''; // provide a default value if req.url is undefined
    if (publicRoutes.includes(url) || ignoredRoutes.includes(url)) {
      return next(); // bypass authentication for these routes
    }
    return clerkMiddleware(req, res, next);
  };

export default customMiddleware;