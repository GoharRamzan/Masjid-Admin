import React, { useState } from 'react';

const Video = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${videoUrl}?autoplay=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoUrl}/hqdefault.jpg`;

  return (
    <div className="sm:w-1/2 lg:w-1/3 flex flex-col p-2">
      {isPlaying ? (
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ) : (
        <div className="relative cursor-pointer aspect-video w-full rounded-xl overflow-hidden shadow-md" onClick={() => setIsPlaying(true)}>
          <img
            src={thumbnailUrl}
            alt="YouTube Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-red-600 text-white text-2xl px-6 py-2 rounded-xl shadow-lg hover:bg-red-700 transition">
              &#9654;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
