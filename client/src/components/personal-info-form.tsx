import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData } from "@shared/schema";
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  summary: z.string().optional(),
});

interface PersonalInfoFormProps {
  data: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      ...data.personalInfo,
      summary: data.summary || "",
    },
    mode: "onChange",
  });

  const handleChange = () => {
    const values = form.getValues();
    const { summary, ...personalInfo } = values;
    onUpdate({ personalInfo, summary });
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Personal Information</h3>
          <p className="text-muted-foreground text-sm">
            Let's start with your basic details. This information will appear at the top of your resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-fullname"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="+1 (555) 123-4567"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="San Francisco, CA"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-location"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website / Portfolio
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe.com"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-website"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="linkedin.com/in/johndoe"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-linkedin"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="github.com/johndoe"
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange();
                    }}
                    data-testid="input-github"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Summary</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write a brief summary of your professional background, key skills, and career objectives (2-3 sentences recommended)"
                  className="min-h-[120px] resize-none"
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange();
                  }}
                  data-testid="input-summary"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                {field.value?.length || 0} characters
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
