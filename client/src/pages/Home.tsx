import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const highlights = [
    {
      title: "2026 Workout Schedule",
      description: "4 days a week training sessions across Oahu",
      icon: Calendar,
      link: "/schedule",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Join Our Community",
      description: "Three membership tiers to fit your running journey",
      icon: Users,
      link: "/join",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Professional Coaching",
      description: "Personal coaching and physical therapy services",
      icon: Trophy,
      link: "/coaching",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Quick Access Section */}
      <section className="section-padding bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Get Started Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore what Hawaii Running Project has to offer and join our growing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={highlight.title} className="card-float p-6 group hover:scale-105 transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-full ${highlight.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {highlight.description}
                  </p>
                  <Link to={highlight.link}>
                    <Button 
                      className="w-full bg-green-700 text-white hover:bg-green-600 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 