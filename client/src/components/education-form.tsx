import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData, Education } from "@shared/schema";
import { educationSchema } from "@shared/schema";
import { nanoid } from "nanoid";

interface EducationFormProps {
  data: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      id: "",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    },
  });

  const addOrUpdateEducation = (values: Education) => {
    const existingIndex = data.education.findIndex((edu) => edu.id === values.id);
    
    if (existingIndex >= 0) {
      const updated = [...data.education];
      updated[existingIndex] = values;
      onUpdate({ education: updated });
    } else {
      onUpdate({ education: [...data.education, { ...values, id: nanoid() }] });
    }
    
    form.reset({
      id: "",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    });
    setEditingId(null);
  };

  const editEducation = (edu: Education) => {
    form.reset(edu);
    setEditingId(edu.id);
  };

  const deleteEducation = (id: string) => {
    onUpdate({ education: data.education.filter((edu) => edu.id !== id) });
  };

  const cancelEdit = () => {
    form.reset({
      id: "",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Education</h3>
        <p className="text-muted-foreground text-sm">
          Add your educational background. Include degrees, certifications, and relevant coursework.
        </p>
      </div>

      {data.education.length > 0 && (
        <div className="space-y-4">
          {data.education.map((edu) => (
            <Card key={edu.id} className="hover-elevate transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      {edu.degree}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.institution} {edu.location && `• ${edu.location}`}
                    </p>
                    {edu.field && (
                      <p className="text-sm text-muted-foreground">
                        {edu.field}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate || ""}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editEducation(edu)}
                      data-testid={`button-edit-education-${edu.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEducation(edu.id)}
                      data-testid={`button-delete-education-${edu.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {edu.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{edu.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? "Edit Education" : "Add New Education"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addOrUpdateEducation)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="University of California" data-testid="input-institution" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bachelor of Science" data-testid="input-degree" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="field"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Computer Science" data-testid="input-field" />
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
                        <Input {...field} placeholder="Berkeley, CA" data-testid="input-edu-location" />
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
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Sep 2016" data-testid="input-edu-start" />
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
                        <Input {...field} placeholder="May 2020" data-testid="input-edu-end" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gpa"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>GPA (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="3.8/4.0" data-testid="input-gpa" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Relevant coursework, honors, achievements, or activities"
                        className="min-h-[100px] resize-none"
                        data-testid="input-edu-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" data-testid="button-save-education" className="min-h-9">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : "Add"} Education
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-education">
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
