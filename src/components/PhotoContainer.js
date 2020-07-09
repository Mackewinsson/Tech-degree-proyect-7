import React from "react";
import Photo from "./Photo";
// import NotFound from "./NotFound";

const PhotoContainer = (props) => {
  let data = props.data;
  let results;
  if (data) {
    results = data.map((flickr) => (
      <Photo
        key={flickr.id.toString()}
        photo={`https://farm${flickr.farm}.staticflickr.com/${flickr.server}/${flickr.id}_${flickr.secret}.jpg`}
      />
    ));
  }
  return (
    <div className="photo-container">
      <h2>{props.tag}</h2>
      <ul>{results}</ul>
    </div>
  );
};

export default PhotoContainer;
