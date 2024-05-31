// ls | grep package | xargs cat | jq .name
process.stdin
  .pipe(process.stdout)
  .on("data", (msg) => console.log("data", msg.toString()))
  .on("error", (err) => console.log("error", err))
  .on("end", () => console.log("end"))
  .on("close", () => console.log("close"));
