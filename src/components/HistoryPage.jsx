import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Trash } from 'lucide-react';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const savedImages = JSON.parse(localStorage.getItem('capturedImages') || '[]');
    setImages(savedImages);
  };

  const deleteImage = (id) => {
    const updatedImages = images.filter((img) => img.id !== id);
    localStorage.setItem('capturedImages', JSON.stringify(updatedImages));
    setImages(updatedImages);
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all captured images?')) {
      localStorage.setItem('capturedImages', JSON.stringify([]));
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold">Image History</h1>
            <p className="mt-2 text-blue-100">View and manage your captured images</p>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={() => navigate('/')}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Camera
              </button>

              {images.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex-1 sm:flex-none bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash className="w-5 h-5" />
                  Clear All ({images.length})
                </button>
              )}
            </div>

            {images.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-24 h-24 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Images Yet</h3>
                <p className="text-gray-500">Capture some images to see them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={image.image}
                        alt={`Captured on ${image.timestamp}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">{image.timestamp}</p>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
