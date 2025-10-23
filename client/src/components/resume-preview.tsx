import { forwardRef } from "react";
import type { ResumeData, ResumeTemplate } from "@shared/schema";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template }, ref) => {
    const renderModernTemplate = () => (
      <div className="space-y-6 font-['Roboto']">
        <div className="border-b-2 border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {data.personalInfo.website}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                {data.personalInfo.linkedin}
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="w-3 h-3" />
                {data.personalInfo.github}
              </div>
            )}
          </div>
        </div>

        {data.summary && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm text-foreground leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-3">WORK EXPERIENCE</h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-foreground">{exp.position}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                        {exp.location && ` | ${exp.location}`}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate || "N/A"}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-3">EDUCATION</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}
                        {edu.location && ` | ${edu.location}`}
                      </p>
                      {edu.field && (
                        <p className="text-sm text-muted-foreground">{edu.field}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {edu.endDate}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-foreground mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">SKILLS</h2>
            <p className="text-sm text-foreground">{data.skills.join(" • ")}</p>
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-3">PROJECTS</h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-foreground">{proj.name}</h3>
                    {(proj.startDate || proj.endDate) && (
                      <p className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {proj.startDate} {proj.endDate && `- ${proj.endDate}`}
                      </p>
                    )}
                  </div>
                  {proj.url && (
                    <p className="text-xs text-primary">{proj.url}</p>
                  )}
                  {proj.description && (
                    <p className="text-sm text-foreground mt-1">{proj.description}</p>
                  )}
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Technologies: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    const renderClassicTemplate = () => (
      <div className="space-y-5 font-['Roboto']">
        <div className="text-center border-b pb-4">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>|</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>|</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          {(data.personalInfo.website || data.personalInfo.linkedin || data.personalInfo.github) && (
            <div className="flex flex-wrap justify-center gap-x-3 text-xs text-muted-foreground mt-1">
              {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
              {data.personalInfo.linkedin && <span>|</span>}
              {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
              {data.personalInfo.github && <span>|</span>}
              {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
            </div>
          )}
        </div>

        {data.summary && (
          <div>
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide">Summary</h2>
            <p className="text-sm text-foreground leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide border-b pb-1">
              Experience
            </h2>
            <div className="space-y-3">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-foreground">{exp.position}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate || "N/A"}
                    </span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    {exp.company}
                    {exp.location && ` - ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-foreground whitespace-pre-wrap mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide border-b pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-foreground">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {edu.endDate}
                      {edu.gpa && ` | ${edu.gpa}`}
                    </span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    {edu.institution}
                    {edu.location && ` - ${edu.location}`}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-foreground mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide border-b pb-1">
              Skills
            </h2>
            <p className="text-sm text-foreground">{data.skills.join(", ")}</p>
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide border-b pb-1">
              Projects
            </h2>
            <div className="space-y-2">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-foreground">{proj.name}</h3>
                  {proj.url && <p className="text-xs text-primary">{proj.url}</p>}
                  {proj.description && (
                    <p className="text-sm text-foreground mt-1">{proj.description}</p>
                  )}
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className="bg-background text-foreground p-8 w-full max-w-[210mm] mx-auto shadow-lg"
        style={{ minHeight: "297mm" }}
        data-testid="resume-preview"
      >
        {template === "classic" ? renderClassicTemplate() : renderModernTemplate()}
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
