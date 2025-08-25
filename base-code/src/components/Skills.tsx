import { Code2, Smartphone, Palette, Database, Cloud, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const Skills = () => {
  const { t } = useTranslation();
  
  const skills = [
    {
      icon: Code2,
      title: t('skills.flutterDev.title'),
      description: t('skills.flutterDev.description'),
      level: 95
    },
    {
      icon: Smartphone,
      title: t('skills.mobileUI.title'),
      description: t('skills.mobileUI.description'),
      level: 90
    },
    {
      icon: Database,
      title: t('skills.stateManagement.title'),
      description: t('skills.stateManagement.description'),
      level: 85
    },
    {
      icon: Cloud,
      title: t('skills.firebase.title'),
      description: t('skills.firebase.description'),
      level: 88
    },
    {
      icon: Palette,
      title: t('skills.materialDesign.title'),
      description: t('skills.materialDesign.description'),
      level: 92
    },
    {
      icon: Zap,
      title: t('skills.performance.title'),
      description: t('skills.performance.description'),
      level: 80
    }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={skill.title}
              className="bg-card-gradient border-border/50 hover:shadow-card transition-all duration-300 group hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="bg-skill-gradient p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {skill.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {skill.description}
                </p>
                
                {/* Skill level bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{t('skills.proficiency')}</span>
                    <span className="text-primary font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-hero-gradient h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;