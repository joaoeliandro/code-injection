import express from 'express';
import cors from 'cors';
import { exec, spawn } from 'child_process';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

const runCommandWithSpawn = async (command) => {
  const [cmd, ...args] = command.split(/\s/);
  const { stdout, stderr } = spawn(cmd, args || [], { cwd: './docs' });

  for await(const result of stdout) {
    return result.toString().split('\n');
  }

  return '';
}

const runCommandWithExec = async (command) => {
  const promise = new Promise((resolve, reject) => {
    exec(command, (err, res) => err ? reject(err) : resolve(res));
  });

  const response = (await promise).split('\n').filter(index => !!index);

  return response;
}

app.get('/', (request, response) => {
  return response.json({"message": "ok"});
})

app.post('/exec', async (request, response) => {
  const { command } = request.body;

  const result = await runCommandWithExec(command);

  return response.json(JSON.stringify(result));
});

app.post('/spawn', async (request, response) => {
  const { command } = request.body;

  const result = await runCommandWithSpawn(command);

  return response.json(JSON.stringify(result));
});

app.listen(port, () => console.log('Server started on port', port));
