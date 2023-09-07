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
  const answer_1 = Object.keys(data).length;
  const post_result_w_count = async () => {
    return await fetch(
      "https://interview.own-backup-dev.com/challenges/how-many-defs?answer=" +
        answer_1,
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
  const is_letter = (a) => a.toLowerCase() !== a.toUpperCase();
  const answer_2 = () => {
    const str_arr = Object.keys(data).map(
      (en) => en
      //   .split(/[\s`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/)
    );
    //calc max
    console.log(str_arr);
    const max_length = calc_max(str_arr);
    const new_arr = str_arr.filter((f) => f.length === max_length);
    return new_arr;
  };
  const calc_max = (Arr) => {
    let max_length = 0;
    const max_str_arr = [];
    for (const st of Arr) {
      if (max_length < st.length) max_length = st.length;
    }
    // for (const sub_arr of Arr) {
    //   for (const word of sub_arr) {
    //     if (word.length > max_length) {
    //       max_length = word.length;
    //       //   max_str;
    //     }
    //   }
    // }
    return max_length;
  };
  const post_result_w_length = async () => {
    return await fetch(
      "https://interview.own-backup-dev.com/challenges/longest-defs",
      {
        method: "POST",
        body: JSON.stringify(answer_2()),
        headers: {
          uuid: "9b5e6f3e-5fad-458c-a697-081d00a32a1f",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => json);
  };
  //   console.log(`${Object.entries(data)}`);

  //   console.log(an);
  //   an.filter((element) => {
  //     console.log(element.split(/[,\s]+/));
  //   });
  //   console.log(an);
  res.send(`${await post_result_w_length()}`);
});

app.listen(port, () => {
  console.log("listen on " + port);
});
