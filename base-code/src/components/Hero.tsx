import { ArrowDown, Code2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Smartphone className="w-8 h-8 text-primary" />
            <Code2 className="w-8 h-8 text-accent" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
            {t('hero.subtitle')}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-hero-gradient hover:shadow-glow transition-all duration-300"
            >
              {t('hero.viewWork')}
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              {t('hero.getInTouch')}
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => scrollToSection('skills')}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;