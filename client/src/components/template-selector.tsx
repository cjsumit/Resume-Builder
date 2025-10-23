import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ResumeTemplate } from "@shared/schema";

interface TemplateSelectorProps {
  selected: ResumeTemplate;
  onSelect: (template: ResumeTemplate) => void;
}

const templates: { value: ResumeTemplate; name: string; description: string }[] = [
  {
    value: "modern",
    name: "Modern",
    description: "Clean lines with accent colors",
  },
  {
    value: "classic",
    name: "Classic",
    description: "Traditional centered layout",
  },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold mb-2">Choose Template</h3>
        <p className="text-muted-foreground text-sm">
          Select a template style for your resume. All templates are ATS-friendly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card
            key={template.value}
            className={`cursor-pointer hover-elevate active-elevate-2 transition-all duration-300 ${
              selected === template.value ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelect(template.value)}
            data-testid={`template-${template.value}`}
          >
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                {selected === template.value && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="aspect-[8.5/11] bg-muted rounded-md border-2 border-border flex items-center justify-center text-sm text-muted-foreground">
                Preview
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
