import { useState, useMemo } from 'react';
import { Search, Play, Star, Info, X, Clock, Calendar } from 'lucide-react';

// Mock Data
const MOVIES = [
  { id: 1, title: "Interstellar Journey", year: 2023, rating: 4.8, runtime: "2h 15m", genres: ["Sci-Fi", "Adventure"], desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "The Last Detective", year: 2024, rating: 4.5, runtime: "1h 58m", genres: ["Crime", "Thriller"], desc: "A retired detective is pulled back into the gritty underworld to solve one final, impossible case.", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Neon Nights", year: 2022, rating: 4.2, runtime: "2h 05m", genres: ["Action", "Sci-Fi"], desc: "In a cyberpunk metropolis, a rogue hacker tries to bring down the mega-corporation controlling the city.", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Whispering Woods", year: 2023, rating: 3.9, runtime: "1h 45m", genres: ["Horror", "Mystery"], desc: "A family moves into an isolated cabin, only to discover the surrounding forest has a mind of its own.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Laughing Out Loud", year: 2024, rating: 4.1, runtime: "1h 32m", genres: ["Comedy"], desc: "Three friends accidentally volunteer for a wild reality show and must survive the embarrassing challenges.", image: "https://images.unsplash.com/photo-1527224857830-43a7ebb8545e?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Desert Drifter", year: 2021, rating: 4.6, runtime: "2h 20m", genres: ["Action", "Adventure"], desc: "A lone survivor traverses a post-apocalyptic wasteland searching for the mythical safe zone.", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800" },
];

const GENRES = ["All", "Sci-Fi", "Action", "Adventure", "Crime", "Thriller", "Horror", "Comedy"];

export default function MovieExplorer() {
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Derived state: Filter movies based on search AND genre
  const filteredMovies = useMemo(() => {
    return MOVIES.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = activeGenre === 'All' || movie.genres.includes(activeGenre);
      return matchesSearch && matchesGenre;
    });
  }, [search, activeGenre]);

  // Modal Handlers
  const openModal = (movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-rose-500 selection:text-white pb-20">
      
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
          STREAM<span className="text-white">FLIX</span>
        </h1>
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Genre Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeGenre === genre 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">No movies found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map(movie => (
              <div 
                key={movie.id} 
                onClick={() => openModal(movie)}
                className="group relative rounded-2xl overflow-hidden aspect-[2/3] cursor-pointer bg-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/20"
              >
                {/* Image */}
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 flex-wrap mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {movie.genres.map(g => (
                      <span key={g} className="text-[10px] uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-1 rounded-sm text-white/90">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-rose-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    <Star size={14} fill="currentColor" />
                    <span>{movie.rating}</span>
                    <span className="text-slate-400 mx-1">•</span>
                    <span className="text-slate-300">{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal / Popup */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Modal Background Click Listener */}
          <div className="absolute inset-0" onClick={closeModal}></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Image Section */}
            <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative">
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:hidden" />
            </div>

            {/* Modal Details Section */}
            <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                {selectedMovie.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-300 mb-6">
                <span className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md">
                  <Star size={16} fill="currentColor" /> {selectedMovie.rating} Match
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {selectedMovie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {selectedMovie.runtime}
                </span>
              </div>

              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {selectedMovie.desc}
              </p>

              <div className="flex gap-4">
                <button className="flex-1 bg-white hover:bg-slate-200 text-slate-900 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Play size={20} fill="currentColor" /> Play Now
                </button>
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700">
                  <Info size={20} /> Trailer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}