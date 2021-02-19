
const fs = require('fs');
const path = require('path');

let json = fs.readFileSync(path.join(__dirname, './data.json'));
let data = JSON.parse(json);

/**
 * Use the data mapper pattern to encapsulate data transformations
 * 
 * https://en.wikipedia.org/wiki/Data_mapper_pattern
 * https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/#Data-Mappers
 */

const TracksMap = {
  toGraphQL: (tracks) => {
    return tracks.map((track, index) => ({
      ...track,
      number: index + 1
    }))
  }
}

const AlbumMap = {
  toGraphQL: (album) => ({
    ...album,
    tracks: TracksMap.toGraphQL(album.tracks)
  })
}

const db = {
  getAllAlbums: () => {
    return data.albums.map((a) => AlbumMap.toGraphQL(a))
  },
  getAlbumByTitle: (albumTitle) => {
    const album = data.albums.find((a) => a.title === albumTitle);
    if (!album) {
      throw new Error("Album not found")
    }
    return AlbumMap.toGraphQL(album);
  },
  getAlbumsByGenre: (albumGenre) => {
    const albums = data.albums.filter((a) => a.genre === albumGenre);
    return albums.map((a) => AlbumMap.toGraphQL(a));
  }
}

module.exports = db;