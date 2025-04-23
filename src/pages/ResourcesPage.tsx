
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, FileText, GraduationCap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "paper" | "game" | "course";
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  icon: React.ReactNode;
  link: string;
}

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    document.title = "Educational Resources | Nobel Campus";
  }, []);

  const resources: Resource[] = [
    {
      id: "1",
      title: "Introduction to the Nobel Prize",
      description: "Learn about the history and legacy of the Nobel Prize and its founder, Alfred Nobel.",
      type: "article",
      category: "general",
      level: "beginner",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "2",
      title: "The Physics of Einstein: Relativity Explained",
      description: "Explore Einstein's revolutionary theories that changed our understanding of space and time.",
      type: "video",
      category: "physics",
      level: "intermediate",
      icon: <Video className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "3",
      title: "Nobel Peace Prize: Building a Better World",
      description: "How Nobel Peace Prize winners have influenced international relations and human rights.",
      type: "paper",
      category: "peace",
      level: "intermediate",
      icon: <FileText className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "4",
      title: "Nobel Lab: DNA Structure Interactive",
      description: "An interactive game exploring the discovery of DNA's structure by Watson and Crick.",
      type: "game",
      category: "medicine",
      level: "beginner",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "5",
      title: "Chemical Reactions: From Nobel Discoveries to Everyday Life",
      description: "Learn how Nobel Prize-winning chemistry research affects products we use daily.",
      type: "article",
      category: "chemistry",
      level: "beginner",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "6",
      title: "The Literature of Gabriel García Márquez",
      description: "Analysis of magical realism in the works of the Nobel Prize-winning author.",
      type: "video",
      category: "literature",
      level: "advanced",
      icon: <Video className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "7",
      title: "Economic Theory and Global Poverty",
      description: "How Nobel laureates in economics have contributed to fighting global poverty.",
      type: "paper",
      category: "economic",
      level: "advanced",
      icon: <FileText className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "8",
      title: "Radiation and Medicine: Marie Curie's Legacy",
      description: "The impact of Marie Curie's discoveries on modern medical treatments.",
      type: "course",
      category: "physics",
      level: "intermediate",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "9",
      title: "The Quantum World for Beginners",
      description: "An accessible introduction to quantum physics concepts developed by Nobel laureates.",
      type: "article",
      category: "physics",
      level: "beginner",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "10",
      title: "Inside the CRISPR Revolution",
      description: "Video documentary on the Nobel Prize-winning gene editing technology.",
      type: "video",
      category: "medicine",
      level: "intermediate",
      icon: <Video className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "11",
      title: "Climate Change and Sustainable Economics",
      description: "Research paper on economic models for addressing climate change.",
      type: "paper",
      category: "economic",
      level: "advanced",
      icon: <FileText className="h-6 w-6" />,
      link: "#"
    },
    {
      id: "12",
      title: "Interactive Timeline: A Century of Nobel Prizes",
      description: "Interactive educational tool exploring the history of Nobel Prizes from 1901 to today.",
      type: "game",
      category: "general",
      level: "beginner",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "#"
    }
  ];

  useEffect(() => {
    const filterResources = () => {
      let results = resources;
      
      // Filter by tab
      if (activeTab !== "all") {
        if (activeTab === "articles") {
          results = results.filter(resource => resource.type === "article");
        } else if (activeTab === "videos") {
          results = results.filter(resource => resource.type === "video");
        } else if (activeTab === "papers") {
          results = results.filter(resource => resource.type === "paper");
        } else if (activeTab === "interactive") {
          results = results.filter(resource => ["game", "course"].includes(resource.type));
        }
      }
      
      // Filter by search term
      if (searchTerm.trim()) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        results = results.filter(
          resource =>
            resource.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            resource.description.toLowerCase().includes(lowerCaseSearchTerm) ||
            resource.category.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      
      setFilteredResources(results);
    };
    
    filterResources();
  }, [searchTerm, activeTab]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-6 w-6" />;
      case "video":
        return <Video className="h-6 w-6" />;
      case "paper":
        return <FileText className="h-6 w-6" />;
      default:
        return <GraduationCap className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Educational Resources</h1>
            <p className="mt-2 text-lg text-blue-100">
              Discover learning materials about Nobel Prize winners and their contributions to science and society.
            </p>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {/* Resources content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="papers">Papers</TabsTrigger>
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredResources.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col h-full">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-800">
                              {getTypeIcon(resource.type)}
                            </div>
                            <Badge variant="outline" className={getLevelColor(resource.level)}>
                              {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                          <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                          
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <Badge variant="secondary">
                              {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                            </Badge>
                            <Button variant="outline" className="text-blue-800 hover:text-blue-900">
                              View Resource
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-800 mb-4">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search term or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveTab("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
