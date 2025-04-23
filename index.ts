import fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from 'path';
import express, { Request, Response } from 'express';

interface Endpoint {
  __http_method: string
  __http_path: string
  foo: Function
}

async function getAllEndpoints(endpoint_folder_path: string): Promise<Endpoint[]> {
  if (fs.existsSync(path.resolve(__dirname, endpoint_folder_path))) {
    const list_implementation: string[] = await fsPromises.readdir(path.resolve(__dirname, endpoint_folder_path));
    
    const list_endpoint: Endpoint[] = [];
    for (const imp_filename of list_implementation) {
      list_endpoint.push(require(path.resolve(__dirname, `${endpoint_folder_path}/${imp_filename}`)))
    }

    return list_endpoint;
  } else {
    throw new Error(`Folder ${endpoint_folder_path} doesn't exist`);
  }
}

async function main() {
  const folder_path = 'implementation';
  const list_endpoint: Endpoint[] = await getAllEndpoints(folder_path);
  
  const app = express();
  app.use(express.json());
  const port = 3000;
  app.use(require('cors')());

  for (const endpoint of list_endpoint) {
    app[endpoint.__http_method](endpoint.__http_path, async (req: Request, res: Response) => {
      const headers = req.headers;
      const body = req.body;
      const paths = req.params;
      const query = req.query;
      
      try {
        const foo_result = await endpoint.foo({
          headers,
          body,
          paths,
          query
        });
        res.status(200).json(foo_result);
      } catch (err: any) {
        res.status(500).send(err.toString());
      }
    });
    console.log(`API added: ${endpoint.__http_method} ${endpoint.__http_path}`);
  }
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}

try {
  main();
} catch (err: any) {
  console.error(err);
}
