import { useRef, useState } from "react";
import { Download, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroSection } from "@/components/hero-section";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { WorkExperienceForm } from "@/components/work-experience-form";
import { EducationForm } from "@/components/education-form";
import { SkillsForm } from "@/components/skills-form";
import { ProjectsForm } from "@/components/projects-form";
import { TemplateSelector } from "@/components/template-selector";
import { ResumePreview } from "@/components/resume-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { useResumeStore } from "@/hooks/useResumeStore";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const tabs = [
  { value: "personal", label: "Personal" },
  { value: "experience", label: "Experience" },
  { value: "education", label: "Education" },
  { value: "skills", label: "Skills" },
  { value: "projects", label: "Projects" },
  { value: "template", label: "Template" },
];

export default function Home() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeData, updateResumeData, selectedTemplate, setSelectedTemplate } =
    useResumeStore();
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      setIsGenerating(true);
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your resume.",
      });

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const fileName = resumeData.personalInfo.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";

      pdf.save(fileName);

      toast({
        title: "Success!",
        description: "Your resume has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getCurrentTabIndex = () => tabs.findIndex((tab) => tab.value === activeTab);

  const goToNextTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].value);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].value);
    }
  };

  if (!showBuilder) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-2">
              <Download className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ResumeCraft
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <HeroSection onGetStarted={() => setShowBuilder(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Download className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ResumeCraft
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden"
              data-testid="button-toggle-preview"
            >
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              data-testid="button-download"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`${showPreview ? "hidden lg:block" : ""}`}>
            <Card className="sticky top-24 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      data-testid={`tab-${tab.value}`}
                      className="text-xs md:text-sm"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <PersonalInfoForm data={resumeData} onUpdate={updateResumeData} />
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <WorkExperienceForm data={resumeData} onUpdate={updateResumeData} />
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  <EducationForm data={resumeData} onUpdate={updateResumeData} />
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <SkillsForm data={resumeData} onUpdate={updateResumeData} />
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  <ProjectsForm data={resumeData} onUpdate={updateResumeData} />
                </TabsContent>

                <TabsContent value="template" className="space-y-6">
                  <TemplateSelector
                    selected={selectedTemplate}
                    onSelect={setSelectedTemplate}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between pt-6 border-t mt-6">
                <Button
                  variant="outline"
                  onClick={goToPreviousTab}
                  disabled={getCurrentTabIndex() === 0}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  {getCurrentTabIndex() + 1} of {tabs.length}
                </div>
                <Button
                  onClick={goToNextTab}
                  disabled={getCurrentTabIndex() === tabs.length - 1}
                  data-testid="button-next"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className={`${!showPreview ? "hidden lg:block" : ""}`}>
            <div className="sticky top-24">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See your resume update in real-time as you fill in the details.
                </p>
              </div>
              <div className="overflow-auto max-h-[calc(100vh-12rem)] rounded-lg border bg-white dark:bg-card">
                <ResumePreview
                  ref={resumeRef}
                  data={resumeData}
                  template={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
