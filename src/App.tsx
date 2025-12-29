import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/projectsPage/Projects";
import Services from "./pages/servicesPage/Services";
import About from "./pages/aboutPage/About";
import Contact from "./pages/contactPage/Contact";
import ServiceOne from "./pages/service-one/Service-one";
import ServiceTwo from "./pages/service-two/Service-two";
import ServiceThree from "./pages/service-three/Service-three";
import ProjectOne from "./pages/project-one/Project-one";
import ProjectTwo from "./pages/project-two/Project-two";
import BookACall from "./pages/bookPage/book-a-call";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-one" element={<ProjectOne />} />
        <Route path="/project-two" element={<ProjectTwo />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-one" element={<ServiceOne />} />
        <Route path="/service-two" element={<ServiceTwo />} />
        <Route path="/service-three" element={<ServiceThree />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-a-call" element={<BookACall />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
