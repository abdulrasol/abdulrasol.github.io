import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'English' : 'العربية'}
      </span>
    </Button>
  );
};

export default LanguageToggle;