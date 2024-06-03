// src/index.ts
import express, { Request, Response } from "express";
import profiles from "./routes/profiles";
import { connect } from "./services/mongo";
import auth, {authenticateUser} from "./routes/auth";
import path from "path";
import fs from "node:fs/promises";
import reviewRoutes from './routes/reviews';
import movieRoutes from './routes/movies'

connect("movies")

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

app.use(express.json());



app.use("/auth", auth);
const nodeModules = path.resolve(
  __dirname,
  "../../../packages/proto/node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));


app.use("/api/profiles", authenticateUser, profiles);
app.use('/api/reviews', authenticateUser, reviewRoutes);
app.use("/api/movies", authenticateUser, movieRoutes);


app.get("/hello", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
