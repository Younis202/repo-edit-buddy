
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | Nobel Campus";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold sm:text-4xl">About Nobel Campus</h1>
            <p className="mt-2 text-lg text-blue-100">
              Learn about our mission to promote education and inspire future generations through the Nobel legacy.
            </p>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nobel Campus is dedicated to making the extraordinary achievements of Nobel Prize laureates accessible to everyone. 
                  We believe that by sharing the stories of these remarkable individuals and their groundbreaking work, we can inspire 
                  the next generation of innovators, peacemakers, writers, and scientists.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Through comprehensive educational resources, engaging content, and a commitment to accuracy, 
                  we aim to create a global community of learners passionate about the pursuit of knowledge and human progress.
                </p>
              </section>

              <Separator />
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Nobel Prize</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Nobel Prize is the legacy of Swedish inventor and industrialist Alfred Nobel (1833-1896). 
                  In his last will and testament, Nobel directed that the bulk of his fortune should fund annual prizes 
                  for those who "have conferred the greatest benefit to humankind" in physics, chemistry, physiology or medicine, 
                  literature, and peace.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Since 1901, the Nobel Prize has recognized achievements that have changed the world, identifying work that has broken 
                  new ground and yielded important innovations. The Nobel Prize amount for 2023 is set at Swedish kronor (SEK) 11.0 million 
                  per full prize.
                </p>
              </section>

              <Separator />
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational Initiatives</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Nobel Campus, we develop educational materials and programs designed for students of all ages. Our resources are used 
                  by educators worldwide to introduce students to the concepts and discoveries behind the Nobel Prizes.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Our initiatives include:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                  <li>Interactive online learning modules</li>
                  <li>Curriculum resources for educators</li>
                  <li>Digital archives of Nobel laureate interviews and lectures</li>
                  <li>Virtual exhibitions on Nobel Prize-awarded achievements</li>
                  <li>Educational events and webinars with experts and laureates</li>
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Alfred_Nobel_1.jpg" 
                    alt="Alfred Nobel" 
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">Alfred Nobel</h3>
                    <p className="text-sm text-gray-500">1833-1896</p>
                    <p className="mt-2 text-gray-700 text-sm">
                      Swedish chemist, engineer, inventor, businessman, and philanthropist who established the Nobel Prizes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Nobel Prize Facts</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex-shrink-0 text-xs font-bold">1</span>
                      <span className="text-gray-700">The first Nobel Prizes were awarded in 1901.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex-shrink-0 text-xs font-bold">2</span>
                      <span className="text-gray-700">975 individuals and 25 organizations have been awarded the Nobel Prize between 1901 and 2023.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex-shrink-0 text-xs font-bold">3</span>
                      <span className="text-gray-700">Marie Curie is the only person to win Nobel Prizes in two different scientific fields.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex-shrink-0 text-xs font-bold">4</span>
                      <span className="text-gray-700">The average age of Nobel Prize laureates across all categories is 59.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex-shrink-0 text-xs font-bold">5</span>
                      <span className="text-gray-700">The Nobel Prize medals are handmade with 18 carat green gold plated with 24 carat gold.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 bg-blue-50">
                  <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
                  <p className="text-gray-700 text-sm">
                    Have questions or interested in collaborating with Nobel Campus? We'd love to hear from you.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:info@nobelcampus.org" className="text-blue-800 hover:underline">info@nobelcampus.org</a>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">+46 8 123 45 67</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">
                        Sturegatan 14<br />
                        Stockholm, Sweden
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
