//execute by nodejs terminal 1
//node -e 'process.stdin.pipe(require("net").connect(1338))'
process.stdin.pipe(require("net").connect(1338));
//or
//execute by nodejs terminal 2
//node -e 'require("net").createServer((socket)=>{socket.pipe(process.stdout)}).listen(1338)'
require("net")
  .createServer((socket) => {
    socket.pipe(process.stdout);
    socket.on("error", (err) => console.log("error", err));
    socket.on("close", () => console.log("close"));
    socket.on("end", () => console.log("end"));
  })
  .listen(1338);
