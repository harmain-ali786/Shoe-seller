import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
              <img
                src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Spring Collection"
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="relative h-full flex flex-col justify-center items-start p-8 lg:p-16">
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4 border border-white/20">
                  Spring Collection 2025
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  Step Into
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Spring
                  </span>
                </h1>
                <p className="text-lg text-white/90 mb-8 max-w-md">
                  Discover our latest collection with up to 40% off on selected styles
                </p>
                <Link to="/catalog">
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative h-[192px] lg:h-[242px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <Link to="/new-arrivals">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600" />
                <img
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="New Arrivals"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="relative h-full flex flex-col justify-center items-start p-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    New Arrivals
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Fresh styles just landed
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>

            <div className="relative h-[192px] lg:h-[242px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <Link to="/catalog">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600" />
                <img
                  src="https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Best Sellers"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="relative h-full flex flex-col justify-center items-start p-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Best Sellers
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Customer favorites
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
