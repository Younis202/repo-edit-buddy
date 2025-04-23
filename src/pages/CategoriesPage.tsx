
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface CategoryDetail {
  id: string;
  name: string;
  description: string;
  established: string;
  color: string;
  facts: string[];
  notableWinners: {
    name: string;
    year: string;
    achievement: string;
  }[];
}

const CategoriesPage = () => {
  const [currentTab, setCurrentTab] = useState("physics");
  
  useEffect(() => {
    document.title = "Prize Categories | Nobel Campus";
  }, []);

  const categories: Record<string, CategoryDetail> = {
    physics: {
      id: "physics",
      name: "Physics",
      color: "from-purple-500 to-purple-700",
      established: "1901",
      description: "The Nobel Prize in Physics is awarded by the Royal Swedish Academy of Sciences for groundbreaking discoveries and inventions in the field of physics.",
      facts: [
        "The first Nobel Prize in Physics was awarded to Wilhelm Röntgen for his discovery of X-rays.",
        "Physics is the Nobel Prize category with the most shared awards, as discoveries often involve collaboration.",
        "Albert Einstein received the 1921 Nobel Prize in Physics for his explanation of the photoelectric effect, not for his theory of relativity.",
        "Marie Curie won the Physics Prize in 1903 (shared with her husband Pierre Curie and Henri Becquerel) and later won the Chemistry Prize in 1911."
      ],
      notableWinners: [
        { name: "Albert Einstein", year: "1921", achievement: "Discovery of the law of the photoelectric effect" },
        { name: "Marie Curie", year: "1903", achievement: "Research on radiation phenomena" },
        { name: "Richard Feynman", year: "1965", achievement: "Development of quantum electrodynamics" },
        { name: "Peter Higgs", year: "2013", achievement: "Discovery of the Higgs boson" }
      ]
    },
    chemistry: {
      id: "chemistry",
      name: "Chemistry",
      color: "from-green-500 to-green-700",
      established: "1901",
      description: "The Nobel Prize in Chemistry is awarded by the Royal Swedish Academy of Sciences for outstanding contributions in the field of chemistry.",
      facts: [
        "The first Nobel Prize in Chemistry was awarded to Jacobus Henricus van 't Hoff for his work on chemical dynamics and osmotic pressure.",
        "Frederick Sanger is the only person to have been awarded the Chemistry Prize twice (1958 and 1980).",
        "The youngest Chemistry laureate was Frédéric Joliot, awarded at age 35 in 1935.",
        "Dorothy Hodgkin was the third woman to win the Chemistry Prize (1964) for her work on the structures of important biochemical substances."
      ],
      notableWinners: [
        { name: "Marie Curie", year: "1911", achievement: "Discovery of radium and polonium" },
        { name: "Linus Pauling", year: "1954", achievement: "Research on the nature of the chemical bond" },
        { name: "Dorothy Hodgkin", year: "1964", achievement: "Determinations of biochemical structures" },
        { name: "Frances H. Arnold", year: "2018", achievement: "Directed evolution of enzymes" }
      ]
    },
    medicine: {
      id: "medicine",
      name: "Medicine",
      color: "from-red-500 to-red-700",
      established: "1901",
      description: "The Nobel Prize in Physiology or Medicine is awarded by the Nobel Assembly at the Karolinska Institute for outstanding discoveries in physiology or medicine.",
      facts: [
        "The first Medicine Prize was awarded to Emil Adolf von Behring for his work on serum therapy against diphtheria.",
        "The Medicine Prize has been awarded to 12 women as of 2023.",
        "The youngest Medicine laureate was Frederick G. Banting, awarded at age 32 in 1923 for the discovery of insulin.",
        "Many Medicine laureates have been physicians, but some have been researchers without medical degrees."
      ],
      notableWinners: [
        { name: "Alexander Fleming", year: "1945", achievement: "Discovery of penicillin" },
        { name: "James Watson & Francis Crick", year: "1962", achievement: "Structure of DNA" },
        { name: "Tu Youyou", year: "2015", achievement: "Discovery of artemisinin" },
        { name: "Jennifer Doudna & Emmanuelle Charpentier", year: "2020", achievement: "Development of CRISPR-Cas9" }
      ]
    },
    literature: {
      id: "literature",
      name: "Literature",
      color: "from-yellow-500 to-yellow-700",
      established: "1901",
      description: "The Nobel Prize in Literature is awarded by the Swedish Academy for outstanding contributions in the field of literature.",
      facts: [
        "The first Literature Prize was awarded to Sully Prudhomme, a French poet and essayist.",
        "The Literature Prize has been criticized for its Eurocentrism and under-representation of writers from other parts of the world.",
        "The Literature Prize was not awarded in 2018 due to a scandal involving the Swedish Academy.",
        "Bob Dylan's 2016 award caused controversy as some questioned whether song lyrics qualify as literature."
      ],
      notableWinners: [
        { name: "Rabindranath Tagore", year: "1913", achievement: "Deeply sensitive, fresh and beautiful verse" },
        { name: "Ernest Hemingway", year: "1954", achievement: "Mastery of the art of narrative" },
        { name: "Gabriel García Márquez", year: "1982", achievement: "Novels and short stories combining fantasy and reality" },
        { name: "Toni Morrison", year: "1993", achievement: "Novels characterized by visionary force" }
      ]
    },
    peace: {
      id: "peace",
      name: "Peace",
      color: "from-blue-500 to-blue-700",
      established: "1901",
      description: "The Nobel Peace Prize is awarded by the Norwegian Nobel Committee to individuals or organizations that have done outstanding work for fraternity between nations, the abolition or reduction of standing armies, and the holding and promotion of peace congresses.",
      facts: [
        "The Peace Prize is the only Nobel Prize awarded in Oslo, Norway, while all others are awarded in Stockholm, Sweden.",
        "Organizations can receive the Peace Prize, which is not the case for most other Nobel Prizes.",
        "The International Committee of the Red Cross has won the Peace Prize three times (1917, 1944, and 1963).",
        "Malala Yousafzai is the youngest Peace Prize laureate, awarded at age 17 in 2014."
      ],
      notableWinners: [
        { name: "Mother Teresa", year: "1979", achievement: "Work to overcome poverty and distress" },
        { name: "Nelson Mandela & F.W. de Klerk", year: "1993", achievement: "Peaceful end to apartheid" },
        { name: "Malala Yousafzai", year: "2014", achievement: "Struggle for children's rights to education" },
        { name: "World Food Programme", year: "2020", achievement: "Efforts to combat hunger" }
      ]
    },
    "economic-sciences": {
      id: "economic-sciences",
      name: "Economic Sciences",
      color: "from-indigo-500 to-indigo-700",
      established: "1968",
      description: "The Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel was established in 1968 by Sweden's central bank and is awarded by the Royal Swedish Academy of Sciences.",
      facts: [
        "This prize was not established by Alfred Nobel but was created in his memory by Sweden's central bank in 1968.",
        "The youngest Economic Sciences laureate was Esther Duflo, awarded at age 46 in 2019.",
        "Only two women have received the Economic Sciences Prize: Elinor Ostrom (2009) and Esther Duflo (2019).",
        "The first Economic Sciences Prize was awarded to Ragnar Frisch and Jan Tinbergen for developing and applying dynamic models for economic processes."
      ],
      notableWinners: [
        { name: "Amartya Sen", year: "1998", achievement: "Contributions to welfare economics" },
        { name: "Daniel Kahneman", year: "2002", achievement: "Integrating psychological research into economics" },
        { name: "Elinor Ostrom", year: "2009", achievement: "Analysis of economic governance" },
        { name: "Esther Duflo", year: "2019", achievement: "Experimental approach to alleviating global poverty" }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Nobel Prize Categories</h1>
            <p className="mt-2 text-lg text-blue-100">
              Explore the six Nobel Prize categories and learn about their history, notable laureates, and impact.
            </p>
          </div>
        </div>
        
        {/* Categories tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="physics" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
              <TabsTrigger value="physics">Physics</TabsTrigger>
              <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
              <TabsTrigger value="medicine">Medicine</TabsTrigger>
              <TabsTrigger value="literature">Literature</TabsTrigger>
              <TabsTrigger value="peace">Peace</TabsTrigger>
              <TabsTrigger value="economic-sciences">Economics</TabsTrigger>
            </TabsList>
            
            {Object.values(categories).map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-r ${category.color} text-white p-6 mb-6 rounded-md`}>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <p className="text-sm opacity-80">Established {category.established}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">About the Prize</h3>
                        <p className="text-gray-700">{category.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Interesting Facts</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {category.facts.map((fact, index) => (
                            <li key={index} className="text-gray-700">{fact}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Notable Laureates</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          {category.notableWinners.map((winner, index) => (
                            <div key={index} className="border rounded-md p-4">
                              <h4 className="font-semibold">{winner.name}</h4>
                              <p className="text-sm text-gray-500">{winner.year}</p>
                              <p className="text-gray-700 mt-2">{winner.achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 text-center">
                        <Button className={`bg-gradient-to-r ${category.color} hover:opacity-90`}>
                          View All {category.name} Laureates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
