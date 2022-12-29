import _ from 'lodash';

export const artRandomURL = () => {
  const random0to10 = _.random(10);
  return `https://api.artic.edu/api/v1/artworks?page=${random0to10}&limit=100`;
};

export const payloadToReturn = (obj) => {
  const random0to99 = _.random(99);
  const transformString = (arr) =>
    `${arr.slice(0, arr.indexOf('\n'))}(${arr.slice(arr.indexOf('\n') + 1)})`;
  const root = obj.data.data[random0to99];
  const { title } = root;
  const { id } = root;
  const date = root.date_start;
  const description = root.thumbnail.alt_text;
  const artist = transformString(root.artist_display);
  const imageId = root.image_id;
  const imageURL = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  return {
    title,
    date,
    description,
    artist,
    imageId,
    id,
    imageURL,
  };
};
