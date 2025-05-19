import React from 'react'

const Videos = ({videoUrl}) => {
  const videoId = videoUrl;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className=" sm:w-1/2 lg:w-1/3 flex flex-col p-2">
      <img
        src={thumbnailUrl}
        alt="YouTube Thumbnail"
        className="w-full rounded-xl shadow-md"
      />
      <button
        onClick={() => window.open(youtubeUrl, "_blank")}
        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow cursor-pointer"
      >
        ▶ Play on YouTube
      </button>
    </div>
  );
}

export default Videos