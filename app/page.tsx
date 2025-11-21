'use client';

import { useState } from 'react';

interface Trend {
  hashtag: string;
  description: string;
  category: string;
}

interface MemeResult {
  imageUrl: string;
  trend: string;
  caption: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [meme, setMeme] = useState<MemeResult | null>(null);
  const [error, setError] = useState('');

  const fetchTrends = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/trends');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch trends');
      }

      setTrends(data.trends);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trends');
    } finally {
      setLoading(false);
    }
  };

  const generateMeme = async (trend: Trend) => {
    setLoading(true);
    setError('');
    setMeme(null);

    try {
      const response = await fetch('/api/generate-meme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trend }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate meme');
      }

      setMeme(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate meme');
    } finally {
      setLoading(false);
    }
  };

  const downloadMeme = () => {
    if (meme?.imageUrl) {
      const link = document.createElement('a');
      link.href = meme.imageUrl;
      link.download = `meme-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            🔥 Viral Meme Generator
          </h1>
          <p className="text-xl text-white/90">
            Discover Instagram viral trends and generate memes instantly!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <button
              onClick={fetchTrends}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {loading && !trends.length ? '🔍 Searching Trends...' : '🚀 Discover Viral Trends'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {trends.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📈 Today's Viral Trends
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trends.map((trend, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => generateMeme(trend)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-purple-800">
                        {trend.hashtag}
                      </h3>
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        {trend.category}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      {trend.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        generateMeme(trend);
                      }}
                      disabled={loading}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Generate Meme 🎨
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && meme === null && trends.length > 0 && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Creating your meme...</p>
            </div>
          )}

          {meme && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                🎉 Your Viral Meme is Ready!
              </h2>

              <div className="flex flex-col items-center">
                <div className="bg-white rounded-lg shadow-xl p-4 mb-4">
                  <img
                    src={meme.imageUrl}
                    alt="Generated Meme"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>

                <div className="text-center mb-4">
                  <p className="text-gray-700 font-semibold mb-2">
                    Trend: <span className="text-purple-600">{meme.trend}</span>
                  </p>
                  <p className="text-gray-600 italic">"{meme.caption}"</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={downloadMeme}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  >
                    📥 Download Meme
                  </button>
                  <button
                    onClick={() => setMeme(null)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg"
                  >
                    ✨ Create Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-white/80 text-sm">
          <p>🎨 Powered by AI • 🔥 Real-time Trends • ⚡ Instant Meme Generation</p>
        </div>
      </div>
    </div>
  );
}
