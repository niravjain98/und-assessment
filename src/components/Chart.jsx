import React from 'react';
import { TagCloud } from 'react-tagcloud';
import './Chart.css'; 

const Chart = ({ posts, onHashtagSelect }) => {
  const hashtagFrequency = {};

  posts.forEach(post => {
    const tags = post.message.split("#") || [];
    const ret = tags.slice(1).map(item => item.split(" ")[0]);

    ret.forEach(tag => {
      hashtagFrequency["#" + tag] = (hashtagFrequency["#" + tag] || 0) + 1;
    });
  });

  const data = Object.entries(hashtagFrequency).map(([key, value]) => ({
    value: key+" ("+value.toString()+")",
    count: value,
  }));
  const customColorFunction = (tag, size, color) => {
    const lightness = 20;
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };


const options = {
    luminosity: 'bright', 
    hue: 'random',
    customColorFunction: customColorFunction 
  };


  
  
  

  const handleTagSelect = (tag) => {
    onHashtagSelect(tag.value.split(" ")[0]);
  };

  return (
    <div>
    <TagCloud 
        minSize={12}
        maxSize={30}
        tags={data}
        onClick={handleTagSelect}
        colorOptions={options}
        shuffle={true}
        style={{width:"100%"}}
  />
    </div>
  );
};

export default Chart;
