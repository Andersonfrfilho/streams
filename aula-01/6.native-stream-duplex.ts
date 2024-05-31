import { Duplex, Transform } from "stream";

let count = 0;
const server = new Duplex({
  objectMode: true, // faz nao precisar trabalhar com buffer => gasta mais memoria
  encoding: "utf8", // converte o buffer para string
  read() {
    const everySecond = (intervalContext: any) => {
      if (count++ <= 5) {
        this.push(`My name is Anderson[${count}]`);
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };
    setInterval(() => {
      everySecond(this);
    });
  },
  write(chunk, encoding, cb) {
    console.log("[writeable] saving", chunk);
    cb();
  },
});

//provar que sao canais de comunicação diferentes
// write aciona o writeable do Duplex
server.write("[Duplex] hey this is writeable\n");

server.on("data", (msg) => console.log(`[readable]${msg}`));

// push deixa a gente enviar mais dados
server.push(`[duplex] hey this is also a readable\n`);

server.pipe(process.stdout);

const transformToUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase());
  },
});

// cada push vai cair no transform
// ele tbm é um duplex, mas nao possuem comunicação independente
// write fico em maiusculo porque alteramos seu funcionamento manualmente
transformToUpperCase.write("[Transform] hello from write\n");
transformToUpperCase.push("[Transform] hello from push\n");

server
  .pipe(transformToUpperCase)
  //redireciona todos os dados de readable para writeable da duplex
  .pipe(server);
// faz sentido quando precisamos ligar o write com o read caso contrario nao utilize a duplex
