import { Mail, MessageCircle, MapPin, Calendar, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const Contact = () => {
  const { t } = useTranslation();
  
  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: "abdulrsol97@gmail.com",
      action: "mailto:abdulrsol97@gmail.com"
    },
    {
      icon: MessageCircle,
      title: t('contact.whatsapp'),
      value: "+964 781 363 9721",
      action: "https://wa.me/9647813639721"
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: t('contact.locationText'),
      action: null
    },
    {
      icon: Calendar,
      title: t('contact.availability'),
      value: t('contact.availabilityText'),
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/abdulrasol",
      color: "hover:text-foreground"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/abdulrasoolal-hilo",
      color: "hover:text-blue-400"
    },
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://instagram.com/abdulrasol.dev",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="bg-card-gradient border-border/50 hover:shadow-card transition-all duration-300 group hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-skill-gradient p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      {info.action ? (
                        <a 
                          href={info.action}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={info.action.startsWith('http') ? '_blank' : undefined}
                          rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-card-gradient border-border/50 shadow-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {t('contact.ctaTitle')}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t('contact.ctaDescription')}
              </p>
              
              <Button 
                size="lg"
                className="bg-hero-gradient hover:shadow-glow transition-all duration-300 mb-6"
                asChild
              >
                <a href="mailto:abdulrsol97@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  {t('contact.sendMessage')}
                </a>
              </Button>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-border/50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors duration-300 ${social.color} group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;