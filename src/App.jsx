import { useState, useEffect, useRef } from 'react'

function App() {
  const [started, setStarted] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const playerRef = useRef(null)

  // Load YouTube API
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (!document.getElementById('youtube-api')) {
      const tag = document.createElement('script')
      tag.id = 'youtube-api'
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'yD4LkHg-qiA',
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'loop': 1,
          'playlist': 'yD4LkHg-qiA'
        },
        events: {
          'onReady': (event) => {
            playerRef.current = event.target
            setPlayerReady(true)
          }
        }
      })
    }
  }, [])

  const handleStart = () => {
    if (playerRef.current && playerReady) {
      playerRef.current.playVideo()
      playerRef.current.unMute()
      playerRef.current.setVolume(100)
    }
    setStarted(true)
  }

  const toggleAudio = () => {
    if (playerRef.current) {
      const state = playerRef.current.getPlayerState()
      if (state === 1) { // Playing
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-romantic-bg flex items-center justify-center overflow-hidden">

      {/* Hidden YouTube Player */}
      <div id="youtube-player" className="absolute top-0 left-0 pointer-events-none opacity-0"></div>

      {/* Intro Screen */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-romantic-bg transition-opacity duration-1000 ${started ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <button
          onClick={handleStart}
          disabled={!playerReady}
          className={`px-8 py-4 bg-white text-romantic-deep text-xl md:text-2xl font-bold rounded-full shadow-lg border-2 border-romantic-pink transition-all duration-300 ${playerReady ? 'hover:shadow-xl transform hover:scale-105 animate-pulse-slow cursor-pointer' : 'opacity-50 cursor-wait'}`}
        >
          {playerReady ? 'اضغطي هنا يا رندا لتبدأ المفاجأة ❤️' : 'جاري تحميل المفاجأة...'}
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center p-4 text-center max-w-2xl transition-opacity duration-2000 delay-500 ${started ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="space-y-8">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-romantic-text font-serif leading-tight animate-fade-in delay-700">
            إلى حبيبتي وأميرتي رندا
          </h1>

          {/* Image Container */}
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 animate-fade-in delay-1000">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-gold to-romantic-pink blur-md opacity-50 animate-pulse"></div>
            <img
              src="/randa.jpg"
              alt="Randa"
              className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
            />
          </div>

          {/* Message */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 animate-fade-in delay-1500 text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
            <p>
              كل عام وأنتِ الحب، وكل لحظة وأنتِ السعادة.
              <br />
              صممت هذا الموقع البسيط لأقول لكِ كم أحبك.
              <br />
              أنتِ أجمل ما في حياتي ❤️
            </p>
          </div>
        </div>

        {/* Audio Toggle Control */}
        <button
          onClick={toggleAudio}
          className="fixed bottom-4 right-4 p-3 bg-white/80 rounded-full shadow text-romantic-deep hover:bg-white transition-all z-50"
          title="Toggle Music"
        >
          🎵
        </button>
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 text-4xl text-romantic-pink animate-bounce delay-100">❤️</div>
        <div className="absolute bottom-20 right-20 text-3xl text-romantic-deep animate-bounce delay-300">💖</div>
        <div className="absolute top-1/3 right-10 text-2xl text-romantic-gold animate-bounce delay-700">✨</div>
      </div>
    </div>
  )
}

export default App
