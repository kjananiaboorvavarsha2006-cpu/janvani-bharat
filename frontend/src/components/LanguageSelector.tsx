import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageSelectorProps {
  value: 'english' | 'hindi' | 'tamil';
  onChange: (value: 'english' | 'hindi' | 'tamil') => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="hindi">हिन्दी</SelectItem>
          <SelectItem value="tamil">தமிழ்</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
