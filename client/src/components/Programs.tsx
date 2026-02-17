import { Users, Building, GraduationCap, Heart, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Programs = () => {
  const programs = [
    {
      icon: Users,
      title: "Community Run Clubs",
      description: "Weekly group runs in neighborhoods across the islands, welcoming all fitness levels and fostering local connections.",
      features: ["4 sessions per week", "All skill levels", "Social atmosphere", "Local routes"],
      color: "ocean"
    },
    {
      icon: GraduationCap,
      title: "School Programs",
      description: "Youth-focused running programs that promote healthy habits, teamwork, and academic success through physical activity.",
      features: ["K-12 programs", "After school clubs", "Track & field prep", "Health education"],
      color: "island"
    },
    {
      icon: Building,
      title: "Corporate Wellness",
      description: "Workplace fitness programs designed to improve employee health, reduce stress, and build team cohesion.",
      features: ["Lunch time runs", "Team challenges", "Wellness coaching", "Corporate events"],
      color: "sunset"
    },
    {
      icon: Heart,
      title: "Specialized Support",
      description: "Targeted programs for specific communities including seniors, beginners, and those facing health challenges.",
      features: ["Beginner friendly", "Senior programs", "Rehabilitation support", "Mental health focus"],
      color: "ocean"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'ocean':
        return 'bg-gradient-ocean';
      case 'island':
        return 'bg-gradient-island';
      case 'sunset':
        return 'bg-gradient-sunset';
      default:
        return 'bg-gradient-ocean';
    }
  };

  return (
    <section id="programs" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient-island mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our diverse range of running and wellness programs designed to meet the unique 
            needs of Hawaii's communities. From beginners to advanced athletes, we have something for everyone.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card key={program.title} className="card-float p-8 group hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl ${getColorClasses(program.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold mb-3 text-foreground">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {program.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {program.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full btn-ocean">
                  Learn More About This Program
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Schedule Info */}
        <div className="card-float p-8 bg-gradient-to-r from-muted/50 to-accent-muted/30">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold mb-4 text-foreground">
              Weekly Training Schedule
            </h3>
            <p className="text-muted-foreground text-lg">
              Join us for our regular training sessions across multiple locations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-primary mr-2" />
                <span className="font-semibold text-foreground">Monday & Wednesday</span>
              </div>
              <p className="text-muted-foreground">6:00 AM - Morning Energy Runs</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-secondary mr-2" />
                <span className="font-semibold text-foreground">Tuesday & Thursday</span>
              </div>
              <p className="text-muted-foreground">5:30 PM - Evening Community Runs</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-accent mr-2" />
                <span className="font-semibold text-foreground">Saturday</span>
              </div>
              <p className="text-muted-foreground">7:00 AM - Long Distance Training</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="btn-sunset">
              <MapPin className="mr-2 h-5 w-5" />
              View All Locations & Times
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;