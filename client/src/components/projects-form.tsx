import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, FolderGit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { ResumeData, Project } from "@shared/schema";
import { projectSchema } from "@shared/schema";
import { nanoid } from "nanoid";

interface ProjectsFormProps {
  data: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      technologies: [],
      url: "",
      startDate: "",
      endDate: "",
    },
  });

  const addOrUpdateProject = (values: Project) => {
    const existingIndex = data.projects.findIndex((proj) => proj.id === values.id);
    
    if (existingIndex >= 0) {
      const updated = [...data.projects];
      updated[existingIndex] = values;
      onUpdate({ projects: updated });
    } else {
      onUpdate({ projects: [...data.projects, { ...values, id: nanoid() }] });
    }
    
    form.reset({
      id: "",
      name: "",
      description: "",
      technologies: [],
      url: "",
      startDate: "",
      endDate: "",
    });
    setEditingId(null);
    setTechInput("");
  };

  const editProject = (proj: Project) => {
    form.reset(proj);
    setEditingId(proj.id);
  };

  const deleteProject = (id: string) => {
    onUpdate({ projects: data.projects.filter((proj) => proj.id !== id) });
  };

  const cancelEdit = () => {
    form.reset({
      id: "",
      name: "",
      description: "",
      technologies: [],
      url: "",
      startDate: "",
      endDate: "",
    });
    setEditingId(null);
    setTechInput("");
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      const current = form.getValues("technologies");
      if (!current.includes(techInput.trim())) {
        form.setValue("technologies", [...current, techInput.trim()]);
        setTechInput("");
      }
    }
  };

  const removeTechnology = (tech: string) => {
    const current = form.getValues("technologies");
    form.setValue("technologies", current.filter((t) => t !== tech));
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Projects</h3>
        <p className="text-muted-foreground text-sm">
          Showcase your personal projects, open-source contributions, or side work that demonstrates your skills.
        </p>
      </div>

      {data.projects.length > 0 && (
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <Card key={proj.id} className="hover-elevate transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4" />
                      {proj.name}
                    </CardTitle>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        {proj.url}
                      </a>
                    )}
                    {(proj.startDate || proj.endDate) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {proj.startDate} {proj.endDate && `- ${proj.endDate}`}
                      </p>
                    )}
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editProject(proj)}
                      data-testid={`button-edit-project-${proj.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(proj.id)}
                      data-testid={`button-delete-project-${proj.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {proj.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{proj.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addOrUpdateProject)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Project Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="E-commerce Platform" data-testid="input-project-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="github.com/user/project" data-testid="input-project-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Jan 2023" data-testid="input-project-start" />
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
                          <Input {...field} placeholder="Present" data-testid="input-project-end" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe the project, your role, and key accomplishments"
                        className="min-h-[100px] resize-none"
                        data-testid="input-project-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologies"
                render={() => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={handleTechKeyPress}
                        placeholder="e.g., React, Node.js, MongoDB"
                        data-testid="input-technology"
                      />
                      <Button type="button" onClick={addTechnology} data-testid="button-add-technology" className="min-h-9">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {form.watch("technologies").length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch("technologies").map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="gap-2">
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(tech)}
                              className="hover-elevate rounded-full"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" data-testid="button-save-project" className="min-h-9">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : "Add"} Project
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-project">
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
