
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Discover the world of</span>{" "}
                  <span className="block text-yellow-400 mt-2">Nobel Laureates</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Explore the extraordinary achievements of Nobel Prize winners and their 
                  groundbreaking contributions that have shaped our world and advanced human knowledge.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/laureates">
                      <Button className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-gray-50 md:py-6 md:text-lg md:px-10">
                        Explore Laureates
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/categories">
                      <Button variant="outline" className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-white border-white hover:bg-blue-800 md:py-6 md:text-lg md:px-10">
                        View Categories
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-yellow-400 sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center bg-blend-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
