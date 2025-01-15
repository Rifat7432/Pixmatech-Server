import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { GalleryRoutes } from '../modules/Gallery/gallery.routes';

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  { path: '/users', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/gallery', route: GalleryRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
