import { Router } from "express";
import { UserRouters } from "../modules/user/user.route";
import { BlogRouters } from "../modules/blog/blog.route";
import { AdminRouters } from "../modules/admin/admin.route";

const router = Router();


const moduleRoutes = [
    {
        path: '/auth',
        route: UserRouters
    },
    {
        path: '/blogs',
        route: BlogRouters
    },
    {
        path: '/admin',
        route: AdminRouters
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

export default router;