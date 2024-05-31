import { Readable, Writable } from "stream";

//fonte de dados
const readable = new Readable({
  read() {
    this.push("Hello World");
    this.push("Outra coisa");
    this.push("Mais uma coisa");

    //quando acabar os dados
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
  },
});

readable;
//writeable é sempre a saida => imprimir, salvar, ignorar
// .pipe(writeable);
//stdout tbm é um stream
// .pipe(process.stdout); - aqui ele nao ve a nescessidade de passar string separadas
