import express from 'express';
import { Connection } from './DB/Connection.js';
import { routing1 } from './Src/User/UserRouting.js';
import cors from 'cors'


const app = express();

const port = 4000;
Connection();

app.use(express.json());
app.use(cors());

app.use(routing1);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));