
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Laureate {
  id: string;
  firstname: string;
  surname: string;
  category: string;
  year: string;
  motivation: string;
  imgUrl?: string; // Placeholder for image URL
}

const FeaturedLaureates = () => {
  const [laureates, setLaureates] = useState<Laureate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, we would fetch from the Nobel Prize API
    // For now, we'll use mock data
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
      }
    ];

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLaureates(mockLaureates);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Laureates</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Meet some of the remarkable individuals who have been awarded the Nobel Prize for their extraordinary contributions.
          </p>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {laureates.map((laureate) => (
                <Card key={laureate.id} className="overflow-hidden border shadow-md hover:shadow-xl transition-shadow duration-300">
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLaureates;
