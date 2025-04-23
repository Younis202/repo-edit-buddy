
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, GraduationCap } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  type: string;
}

const EducationalResources = () => {
  const resources: Resource[] = [
    {
      id: "1",
      title: "Nobel Prize History",
      description: "Learn about the history and legacy of the Nobel Prize and its founder, Alfred Nobel.",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#",
      type: "Article"
    },
    {
      id: "2",
      title: "Physics Nobel Laureates",
      description: "Explore the groundbreaking discoveries that have transformed our understanding of the universe.",
      icon: <Video className="h-6 w-6" />,
      link: "#",
      type: "Video Series"
    },
    {
      id: "3",
      title: "Peace Prize Impact",
      description: "Understand how Nobel Peace Prize winners have shaped international relations and human rights.",
      icon: <FileText className="h-6 w-6" />,
      link: "#",
      type: "Research Paper"
    },
    {
      id: "4",
      title: "Nobel Prize Educational Games",
      description: "Interactive games for students to learn about Nobel Prize achievements in a fun way.",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "#",
      type: "Educational Resource"
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Educational Resources</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover learning materials about Nobel Prize winners and their contributions to science and society.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="border hover:border-blue-300 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-blue-100 rounded-full text-blue-800">
                    {resource.icon}
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded mb-3">
                    {resource.type}
                  </span>
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <Button variant="outline" className="w-full">
                    Access Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue-800 hover:bg-blue-900">
            Browse All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationalResources;
