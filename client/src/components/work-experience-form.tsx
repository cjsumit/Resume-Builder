import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { ResumeData, WorkExperience } from "@shared/schema";
import { workExperienceSchema } from "@shared/schema";
import { nanoid } from "nanoid";

interface WorkExperienceFormProps {
  data: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

export function WorkExperienceForm({ data, onUpdate }: WorkExperienceFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    },
  });

  const addOrUpdateExperience = (values: WorkExperience) => {
    const existingIndex = data.workExperience.findIndex((exp) => exp.id === values.id);
    
    if (existingIndex >= 0) {
      const updated = [...data.workExperience];
      updated[existingIndex] = values;
      onUpdate({ workExperience: updated });
    } else {
      onUpdate({ workExperience: [...data.workExperience, { ...values, id: nanoid() }] });
    }
    
    form.reset({
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    });
    setEditingId(null);
  };

  const editExperience = (exp: WorkExperience) => {
    form.reset(exp);
    setEditingId(exp.id);
  };

  const deleteExperience = (id: string) => {
    onUpdate({ workExperience: data.workExperience.filter((exp) => exp.id !== id) });
  };

  const cancelEdit = () => {
    form.reset({
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Work Experience</h3>
        <p className="text-muted-foreground text-sm">
          Add your professional experience. Start with your most recent position.
        </p>
      </div>

      {data.workExperience.length > 0 && (
        <div className="space-y-4">
          {data.workExperience.map((exp) => (
            <Card key={exp.id} className="hover-elevate transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {exp.position}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editExperience(exp)}
                      data-testid={`button-edit-experience-${exp.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExperience(exp.id)}
                      data-testid={`button-delete-experience-${exp.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {exp.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{exp.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? "Edit Experience" : "Add New Experience"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addOrUpdateExperience)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position / Job Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Software Engineer" data-testid="input-position" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Tech Corp" data-testid="input-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="New York, NY" data-testid="input-exp-location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jan 2020" data-testid="input-start-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dec 2023" disabled={form.watch("current")} data-testid="input-end-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0 pt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-current"
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Currently working here</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description & Key Achievements</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your responsibilities and achievements. Use bullet points for ATS optimization:&#10;• Led development of...&#10;• Increased efficiency by...&#10;• Collaborated with..."
                        className="min-h-[120px] resize-none"
                        data-testid="input-exp-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" data-testid="button-save-experience" className="min-h-9">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : "Add"} Experience
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-experience">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
