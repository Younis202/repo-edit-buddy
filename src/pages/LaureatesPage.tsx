
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Laureate {
  id: string;
  firstname: string;
  surname: string;
  category: string;
  year: string;
  motivation: string;
  imgUrl?: string;
}

const LaureatesPage = () => {
  const [laureates, setLaureates] = useState<Laureate[]>([]);
  const [filteredLaureates, setFilteredLaureates] = useState<Laureate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  useEffect(() => {
    document.title = "Nobel Laureates | Nobel Campus";
  }, []);

  useEffect(() => {
    // In a real implementation, we would fetch from the Nobel Prize API
    const mockLaureates: Laureate[] = [
      {
        id: "1",
        firstname: "Marie",
        surname: "Curie",
        category: "Physics",
        year: "1903",
        motivation: "For her research on radiation phenomena",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/800px-Marie_Curie_c1920.jpg"
      },
      {
        id: "2",
        firstname: "Albert",
        surname: "Einstein",
        category: "Physics",
        year: "1921",
        motivation: "For his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/800px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
      },
      {
        id: "3",
        firstname: "Martin Luther",
        surname: "King Jr.",
        category: "Peace",
        year: "1964",
        motivation: "For his non-violent struggle for civil rights",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/800px-Martin_Luther_King%2C_Jr..jpg"
      },
      {
        id: "4",
        firstname: "Malala",
        surname: "Yousafzai",
        category: "Peace",
        year: "2014",
        motivation: "For their struggle against the suppression of children and young people and for the right of all children to education",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Shinz%C5%8D_Abe_and_Malala_Yousafzai_%282_cropped%29.jpg/800px-Shinz%C5%8D_Abe_and_Malala_Yousafzai_%282_cropped%29.jpg"
      },
      {
        id: "5",
        firstname: "Gabriel García",
        surname: "Márquez",
        category: "Literature",
        year: "1982",
        motivation: "For his novels and short stories, in which the fantastic and the realistic are combined in a richly composed world of imagination",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Gabriel_Garcia_Marquez.jpg/800px-Gabriel_Garcia_Marquez.jpg"
      },
      {
        id: "6",
        firstname: "Tu",
        surname: "Youyou",
        category: "Medicine",
        year: "2015",
        motivation: "For her discoveries concerning a novel therapy against Malaria",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tu_Youyou_%28cropped%29.jpg/800px-Tu_Youyou_%28cropped%29.jpg"
      },
      {
        id: "7",
        firstname: "Dorothy",
        surname: "Hodgkin",
        category: "Chemistry",
        year: "1964",
        motivation: "For her determinations by X-ray techniques of the structures of important biochemical substances",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dorothy_Hodgkin_Nobel.jpg/800px-Dorothy_Hodgkin_Nobel.jpg"
      },
      {
        id: "8",
        firstname: "Amartya",
        surname: "Sen",
        category: "Economic Sciences",
        year: "1998",
        motivation: "For his contributions to welfare economics",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Amartya_Sen_at_the_2012_Fronteiras_do_Pensamento%2C_São_Paulo_02.jpg/800px-Amartya_Sen_at_the_2012_Fronteiras_do_Pensamento%2C_São_Paulo_02.jpg"
      }
    ];

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLaureates(mockLaureates);
      setFilteredLaureates(mockLaureates);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let results = laureates;
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(laureate => 
        laureate.firstname.toLowerCase().includes(lowerCaseSearch) || 
        laureate.surname.toLowerCase().includes(lowerCaseSearch) ||
        laureate.motivation.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      results = results.filter(laureate => laureate.category === categoryFilter);
    }
    
    setFilteredLaureates(results);
  }, [searchTerm, categoryFilter, laureates]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Nobel Laureates</h1>
            <p className="mt-2 text-lg text-blue-100">
              Discover the individuals whose groundbreaking work has been recognized with a Nobel Prize.
            </p>
          </div>
        </div>
        
        {/* Filters section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search laureates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Peace">Peace</SelectItem>
                    <SelectItem value="Economic Sciences">Economic Sciences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Laureates list */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredLaureates.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredLaureates.map((laureate) => (
                    <Card key={laureate.id} className="overflow-hidden border hover:border-blue-300 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative h-64 bg-gray-200">
                          <img 
                            src={laureate.imgUrl} 
                            alt={`${laureate.firstname} ${laureate.surname}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <span className="inline-block bg-blue-800 text-white px-2 py-1 text-xs font-semibold rounded-full">
                              {laureate.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900">
                            {laureate.firstname} {laureate.surname}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">{laureate.year}</p>
                          <p className="text-gray-600 text-sm line-clamp-4">
                            {laureate.motivation}
                          </p>
                          <Button variant="link" className="mt-4 px-0 text-blue-800 font-medium">
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No laureates found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LaureatesPage;
