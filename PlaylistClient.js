class PlaylistClient {
  constructor(uuid) {
    this.uuid = uuid;
  }

  async list_songs(count, playlist_id) {
    let data = [];
    if (count < 20) {
      data = await request("https://interview.own-backup-dev.com/songs", {
        playlist_id: playlist_id,
        page: 1,
        items_per_page: count,
      });
    } else if (count >= 20) {
      for (let i = 1; i <= count / 10; i++) {
        const new_data = await request(
          "https://interview.own-backup-dev.com/songs",
          {
            playlist_id: playlist_id,
            page: i,
            items_per_page: 10,
          }
        );
        console.log("new", new_data);
        data.push(new_data);
      }
    }
    return data;
  }

  async song_names(count, playlist_id) {
    const songs = await this.list_songs(count, playlist_id);
    console.log(songs);
    return songs.map((song) => {
      if (song.track !== "undefined") return song.track?.name;
    });
  }

  async submit_songs(songs) {
    const response = await fetch(
      "https://interview.own-backup-dev.com/challenges/first-n-songs",
      {
        method: "POST",
        body: JSON.stringify(songs),
        headers: {
          uuid: this.uuid,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }
}
const request = async (url, params = {}, body = {}, method = "GET") => {
  let options = {
    method,
  };
  url += "?" + new URLSearchParams(params).toString();
  if (method == "POST") {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options).then((response) => response.json());
};
module.exports = PlaylistClient;
