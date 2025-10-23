import { FileText, Download, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            100% ATS-Compatible
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Build Your Perfect Resume in{" "}
            <span className="bg-gradient-to-r from-accent via-accent/90 to-accent bg-clip-text text-transparent">
              Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes with our powerful builder. Real-time preview, multiple templates, and instant PDF download.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              data-testid="button-get-started"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent shadow-lg shadow-accent/20"
            >
              <FileText className="w-5 h-5 mr-2" />
              Create Resume Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-primary-foreground border-white/20 hover:bg-white/20"
              data-testid="button-learn-more"
            >
              <Zap className="w-5 h-5 mr-2" />
              See How It Works
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { icon: CheckCircle2, title: "ATS-Optimized", desc: "Passes all applicant tracking systems" },
              { icon: Download, title: "Free Download", desc: "Export to PDF instantly, no cost" },
              { icon: Zap, title: "Quick & Easy", desc: "Build in under 10 minutes" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="p-3 rounded-lg bg-accent/20">
                  <feature.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-primary-foreground">{feature.title}</h3>
                <p className="text-sm text-primary-foreground/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
