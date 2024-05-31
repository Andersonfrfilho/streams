import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from "fs";
//fonte de dados
const readable = new Readable({
  read() {
    for (let index = 0; index < 100; index++) {
      const person = {
        id: Date.now() + index,
        name: "Anderson Filho " + index,
      };
      const data = JSON.stringify(person);
      this.push(data);
    }
    this.push(null);
  },
});

// saida de dados
const writeable = new Writable({
  write(chunk, encoding, callback) {
    // o chunk é um pedaço de um buffer por isso ele é um array de binario
    console.log("chunk", chunk);
    // como o chunk é um pedacinho do buffer, convertemos ele para string
    console.log("msg", chunk.toString());
    callback();
  },
});

const mapFields = new Transform({
  transform(chunk, encoding, callback) {
    const person = JSON.parse(chunk);
    const result = `${person.id} - ${person.name.toUpperCase()}\n`;
    // primeiro parametro é erro
    callback(null, result);
  },
});

interface TransformWithCounter extends Transform {
  counter: number;
}

const mapHeaders = new Transform({
  transform(chunk, encoding, callback) {
    const self = this as TransformWithCounter;
    self.counter = self.counter ?? 0;
    if (self.counter) {
      return callback(null, chunk);
    }
    // primeiro parametro é erro
    self.counter += 1;
    callback(null, "id,name\n".concat(chunk));
  },
});

// Classe para mapHeaders
class MapHeaders extends Transform {
  counter: number;

  constructor() {
    super();
    this.counter = 0;
  }

  _transform(
    chunk: any,
    encoding: string,
    callback: (error?: Error | null, data?: any) => void
  ) {
    if (this.counter > 0) {
      return callback(null, chunk);
    } else {
      this.counter += 1;
      callback(null, "id,name\n".concat(chunk.toString()));
    }
  }
}

const mapHeaders2 = new MapHeaders();

readable
  .pipe(mapFields)
  // .pipe(mapHeaders2)
  //writeable é sempre a saida => imprimir, salvar, ignorar
  // .pipe(writeable)
  .pipe(mapHeaders)
  // .pipe(process.stdout)
  .pipe(createWriteStream("my.csv"))
  .on("finish", () => {
    console.log("finished");
  });
//stdout tbm é um stream
// .pipe(process.stdout); - aqui ele nao ve a nescessidade de passar string separadas
// pipeline.on("finish", () => {
//   console.log("finished");
// });

// dia a dia vamos ter algo desse tipo
