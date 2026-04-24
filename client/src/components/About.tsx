import { Heart, Users, Calendar, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const services = [
    {
      icon: Heart,
      title: "Run, Fitness, and Nutrition",
      description: "Comprehensive health programs focused on running, fitness training, and nutritional guidance."
    },
    {
      icon: Users,
      title: "Coaching",
      description: "Expert coaching and guidance for runners of all levels and abilities."
    },
    {
      icon: Calendar,
      title: "Weekly Runs",
      description: "Group training sessions five days a week - all running levels welcome to join at any time!"
    },
    {
      icon: Trophy,
      title: "Annual Events and Races",
      description: "Exciting community events and competitive races throughout the year."
    }
  ];

  const programs = [
    "Run clubs in communities and schools",
    "Public events and races", 
    "Corporate running programs",
    "Programs designed specifically for the overweight and obese",
    "Programs for homeless individuals",
    "Programs for alcohol and substance abusers",
    "Kids programs",
    "Women's programs", 
    "Programs for the physically challenged",
    "Single parent programs",
    "Ex-offender programs",
    "Programs for overworked two-income families"
  ];

  const boardMembers = [
    { name: "Kawika Carlson", role: "Founder" },
    { name: "Weni Amrich", role: "Chair" },
    { name: "Peter Hill", role: "Vice-Chair" },
    { name: "Moana Wong", role: "Secretary" },
    { name: "Tim Ferber", role: "Treasurer" },
    { name: "Seth August", role: "Past Chair" },
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient-ocean mb-6">
            What is the Hawaii Running Project?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            An ambitious one-of-a-kind project that will aggressively try to solve many of Hawaiʻi's health and social problems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="card-float p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-ocean rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {service.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Training Schedule Highlight */}
        <div className="text-center mb-16">
          <div className="card-float p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hawaii Running Project offers group training sessions <strong>five days a week</strong>, all running levels are welcome to join at any time! Check out our <strong>CALENDAR</strong> for details.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="card-float p-8">
            <h3 className="text-2xl font-display font-semibold text-gradient-island mb-4">
              Mission Statement
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To improve the overall health in the State of Hawaiʻi and reduce obesity of its residents by creating running programs that are available to everyone in Hawaiʻi.
            </p>
          </div>

          <div className="card-float p-8">
            <h3 className="text-2xl font-display font-semibold text-gradient-island mb-4">
              Vision Statement
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Implement a variety of community service running programs to meet the health and wellness needs of all including:
            </p>
            <ul className="text-muted-foreground leading-relaxed space-y-2">
              {programs.slice(0, 6).map((program, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  {program}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Extended Programs List */}
        <div className="mb-16">
          <div className="card-float p-8">
            <h3 className="text-2xl font-display font-semibold text-gradient-island mb-6 text-center">
              Specialized Programs
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {programs.slice(6).map((program, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{program}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Board and Committee */}
        <div>
          <div className="card-float p-8">
            <h3 className="text-2xl font-display font-semibold text-gradient-island mb-6 text-center">
              Board and Committee
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8 text-center max-w-4xl mx-auto">
              The main objective of the Board and Committee will be to give direction to the Hawaii Running Project by voicing the opinion of the community. Determine the need for projects and help establish priority.
            </p>
            
            <h4 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
              2025 HRP Board & Committee Leaders
            </h4>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {boardMembers.map((member, index) => (
                <div key={index} className="bg-muted/20 rounded-lg p-4 text-center">
                  <h5 className="font-semibold text-foreground">{member.name}</h5>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;