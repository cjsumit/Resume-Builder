import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { ResumeData } from "@shared/schema";

interface SkillsFormProps {
  data: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      onUpdate({ skills: [...data.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onUpdate({ skills: data.skills.filter((skill) => skill !== skillToRemove) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Skills</h3>
        <p className="text-muted-foreground text-sm">
          Add your key skills and competencies. Include both technical and soft skills relevant to your target role.
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., JavaScript, Project Management, Leadership"
          data-testid="input-skill"
        />
        <Button onClick={addSkill} data-testid="button-add-skill" className="min-h-9">
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-sm px-3 py-1.5 gap-2"
              data-testid={`badge-skill-${index}`}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover-elevate rounded-full"
                data-testid={`button-remove-skill-${index}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {data.skills.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No skills added yet. Add your first skill above.</p>
        </div>
      )}
    </div>
  );
}
