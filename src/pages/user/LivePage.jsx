import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLayout from '../../components/Layout/UserLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Play, 
  Calendar, 
  Eye,
  Video,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const LivePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchLiveVideos();
  }, []);

  const fetchLiveVideos = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/user/live-videos');
      setVideos(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedVideo(response.data.data[0]);
      }
    } catch (error) {
      toast.error('Failed to fetch live videos');
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  const getYouTubeThumbnail = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` : '';
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-3">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Live Draw Videos</h1>
            <p className="text-gray-300 text-lg">Watch exciting live draws and winner announcements</p>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white bg-opacity-10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Video className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Live Videos Available</h3>
              <p className="text-gray-300 text-lg">
                Live draw videos will appear here once they are uploaded by the admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Video Player */}
              <div className="lg:col-span-3">
                {selectedVideo && (
                  <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                    <div className="aspect-video">
                      <iframe
                        src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-6 bg-gray-800">
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{selectedVideo.month} {selectedVideo.year}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Playlist */}
              <div className="lg:col-span-1">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    All Videos ({videos.length})
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                          selectedVideo?.id === video.id
                            ? 'ring-2 ring-blue-400 bg-white bg-opacity-20'
                            : 'hover:bg-white hover:bg-opacity-10'
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="relative">
                          <img
                            src={getYouTubeThumbnail(video.videoUrl)}
                            alt={video.title}
                            className="w-full h-20 object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/320x180/1f2937/ffffff?text=Video+Thumbnail';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                          {selectedVideo?.id === video.id && (
                            <div className="absolute top-2 right-2">
                              <div className="bg-blue-500 rounded-full p-1">
                                <Eye className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <div className="flex items-center text-gray-300 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{video.month} {video.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
                  <h4 className="text-white font-bold mb-3">How to Watch</h4>
                  <div className="space-y-2 text-sm text-blue-100">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <span>Select any video from the playlist</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <span>Watch the live draw process</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <span>See winner announcements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default LivePage;