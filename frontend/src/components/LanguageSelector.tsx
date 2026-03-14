import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Language } from '@/lib/translations';

interface LanguageSelectorProps {
  value: Language;
  onChange: (value: Language) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => onChange(v as Language)}>
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="hindi">हिन्दी</SelectItem>
          <SelectItem value="tamil">தமிழ்</SelectItem>
          <SelectItem value="telugu">తెలుగు</SelectItem>
          <SelectItem value="bengali">বাংলা</SelectItem>
          <SelectItem value="marathi">मराठी</SelectItem>
          <SelectItem value="gujarati">ગુજરાતી</SelectItem>
          <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
