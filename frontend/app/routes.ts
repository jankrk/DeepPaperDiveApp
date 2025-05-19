import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  // route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),

  route("dashboard", "routes/layout.tsx", [
    index("routes/dashboard.tsx"),
    route("new", "routes/newJobForm.tsx"),
    route("job/:id", "routes/jobDetails.tsx"),
  ]),
] satisfies RouteConfig;

