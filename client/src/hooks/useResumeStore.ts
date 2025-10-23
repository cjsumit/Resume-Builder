import { useState, useEffect } from "react";
import type { ResumeData, ResumeTemplate } from "@shared/schema";

const STORAGE_KEY = "resumecraft-data";
const TEMPLATE_KEY = "resumecraft-template";

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
};

export function useResumeStore() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultResumeData;
    }
    return defaultResumeData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(TEMPLATE_KEY);
      return (stored as ResumeTemplate) || "modern";
    }
    return "modern";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    }
  }, [selectedTemplate]);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const clearResumeData = () => {
    setResumeData(defaultResumeData);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    resumeData,
    setResumeData,
    updateResumeData,
    clearResumeData,
    selectedTemplate,
    setSelectedTemplate,
  };
}
