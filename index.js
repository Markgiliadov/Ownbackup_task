const express = require("express");
const { type } = require("express/lib/response");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const get_w_def = async () => {
    return await fetch(
      "https://interview.own-backup-dev.com/challenges/dictionary",
      {
        method: "GET",
        headers: { uuid: "9b5e6f3e-5fad-458c-a697-081d00a32a1f" },
      }
    )
      .then((res) => res.json())
      .then((json) => json);
  };
  const data = await get_w_def();
  const answer = Object.keys(data).length;
  const post_result = async () => {
    return await fetch(
      "https://interview.own-backup-dev.com/challenges/how-many-defs?answer=" +
        answer,
      {
        method: "POST",
        headers: {
          uuid: "9b5e6f3e-5fad-458c-a697-081d00a32a1f",
          accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => json);
  };
  res.send(`${await post_result()}`);
});

app.listen(port, () => {
  console.log("listen on " + port);
});
