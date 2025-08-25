import { ExternalLink, Github, Star, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

const Projects = () => {
  const { t } = useTranslation();
  
  const projects = [
    {
      title: "Store Management",
      description: "Store Management App is your all-in-one solution for effortless store management. Track inventory, manage invoices, analyze sales, and stay connected with customers and suppliers. Simplify your business operations and boost your profits today!.",
      image: "/app_store_managment.png",
      technologies: ["Flutter", "Dart", "Getx", "ObjectBox"],
      githubUrl: "https://github.com/abdulrasol/store_management",
      liveUrl: null,
      featured: true,
      stats: { stars: 4 }
    },
    {
      title: "Store",
      description: "front end store app build build with firebase backend, it free to clone and migrate your adds to run with yours needs",
      image: "/placeholder.svg",
      technologies: ["flutter", "firebase"],
      githubUrl: "https://github.com/abdulrasol/store",
      liveUrl: null,
      featured: true,
      stats: { stars: 1 }
    },
    {
      title: "Solar Hub",
      description: "App to design and calculate solar panel systems, share problems and solutions with the community and buying solar equipment.",
      image: "/placeholder.svg",
      technologies: ["Flutter","Amazon Web Services"],
      githubUrl: "https://github.com/abdulrasol/solar-hub",
      liveUrl: null,
      featured: true,
      stats: { stars: 0 }
    },
     {
      title: "Dot CV Creator",
      description: "Simple tool to create cv in Englilsh and Arabic languages",
      image: "/placeholder.svg",
      technologies: ["Flutter Web"],
      githubUrl: "https://github.com/abdulrasol/dot_cv_creator",
      liveUrl: 'https://dot-cv.netlify.app',
      featured: true,
      stats: { stars: 0 }
    },
    {
      title: "Dot Weather",
      description: "Simple app to get weather data from api.",
      image: "/placeholder.svg",
      technologies: ["Flutter Desktop"],
      githubUrl: "https://github.com/abdulrasol/dot_weather",
      liveUrl: null,
      featured: false,
      stats: { stars: 0 }
    },
      {
      title: "Simple CV Creator App",
      description: "Simple CV Creator App built with Svelte and UIKit CSS. It allows users to create and download their CVs easily.",
      image: "/placeholder.svg",
      technologies: ["svelte","UIKit"],
      githubUrl: "https://github.com/abdulrasol/dot.cv-simple-cv-creator",
      liveUrl: 'https://dot-cv.vercel.app',
      featured: false,
      stats: { stars: 0 }
    },
    {
      title: "Loly OCR",
      description: "Loly image-to-word Simple online app that detect text from image and extract it to word doc or text file Loly is a just CS50 final project, Support 24 languages. Live edit before export as .docs or .txt format",
      image: "/placeholder.svg",
      technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "UIKit","jQuery"],
      githubUrl: "https://github.com/abdulrasol/loly-ocr",
      liveUrl: null,
      featured: false,
      stats: { stars: 0 }
    },
    {
      title: "Spimebook",
      description: "No description provided.",
      image: "/placeholder.svg",
      technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "UIKit","jQuery"],
      githubUrl: "https://github.com/abdulrasol/spimebook",
      liveUrl: null,
      featured: false,
      stats: { stars: 0 }
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
                            className={`bg-card-gradient border-border/50 hover:shadow-card transition-all duration-300 group hover:-translate-y-2`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.featured && <Star className="w-5 h-5 text-primary" />}
                        <span>{project.title}</span>
                      </h3>
                      {project.featured && (
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {t('projects.featured')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech}
                      variant="secondary" 
                      className="bg-skill-gradient border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stats.stars} {t('projects.stars')}</span>
                  </div>
                  {project.stats.users && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.stats.users} {t('projects.users')}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      {t('projects.code')}
                    </a>
                  </Button>
                  
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="flex-1 bg-hero-gradient hover:shadow-glow"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('projects.liveDemo')}
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;