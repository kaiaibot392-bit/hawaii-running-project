import { ArrowRight, MapPin, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.png')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Starting a Healthy<br />
            Revolution in{" "}
            <span className="text-accent">Hawaii</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Join our vibrant community of runners, fitness enthusiasts, and wellness advocates. Together, we're building healthier lives and stronger communities across the islands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="btn-sunset">
              Join Our Runs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center animate-slide-up">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-accent mr-2" />
                <span className="text-3xl font-bold text-white">500+</span>
              </div>
              <p className="text-white/80">Active Members</p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-secondary mr-2" />
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <p className="text-white/80">Weekly Sessions</p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-white">Multiple</span>
              </div>
              <p className="text-white/80">Island Locations</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;