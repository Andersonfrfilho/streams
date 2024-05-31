//create bigger file
//node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from "http";
import { createReadStream, readFileSync } from "fs";
http
  .createServer((req, res) => {
    // trabalhar com arquivo grande é uma má pratica
    // const file = readFileSync("big.file");
    // res.write(file);
    // res.end();
    createReadStream("big.file").pipe(res);
  })
  .listen(3000, () => console.log("listening on port 3000"));
//curl localhost:3000 -o output.txt
