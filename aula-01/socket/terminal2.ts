require("net")
  .createServer((socket) => {
    socket.pipe(process.stdout);
    socket.on("error", (err) => console.log("error", err));
    socket.on("close", () => console.log("close"));
    socket.on("end", () => console.log("end"));
  })
  .listen(1338);
