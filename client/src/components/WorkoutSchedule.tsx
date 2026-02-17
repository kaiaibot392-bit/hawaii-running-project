import { Calendar, Clock, MapPin, Users, Star, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkoutEvent {
  day: string;
  time: string;
  title: string;
  location: string;
  meetingPoint: string;
  description: string;
  parking: string;
  icon: string;
  color: string;
  frequency?: string;
  schedule?: string;
  special?: string;
  mixer?: string;
  motto?: string;
  note?: string;
}

const WorkoutSchedule = () => {
  // Workout schedule data - fetched from Google Calendar in production
  const workoutDays: WorkoutEvent[] = [
    {
      day: "Tuesday",
      time: "6 PM",
      title: "T.N.T (Tuesday Night Training)",
      location: "Magic Island/Ala Moana Beach Park",
      meetingPoint: "Near lifeguard tower 1E",
      description: "Shorter interval training session",
      parking: "Plenty of free parking in the Magic Island parking lot",
      icon: "🔥",
      color: "bg-orange-500"
    },
    {
      day: "Thursday",
      time: "6 PM",
      title: "HOKA Run Club",
      location: "HOKA Ala Moana",
      meetingPoint: "HOKA Store",
      description: "3 or 5 mile routes around Ala Moana Beach Park and Waterfront Park",
      parking: "Free parking on level 2 near the Bloomingdales / Morton's Steak House entrance",
      special: "Post run refreshments provided",
      icon: "🏃‍♀️",
      color: "bg-blue-500"
    },
    {
      day: "Friday",
      time: "6 PM",
      title: "Friday Night Fireworks Potluck",
      location: "Magic Island at Ala Moana Beach Park",
      meetingPoint: "Magic Island",
      description: "Fun run or walk",
      schedule: "6pm social run, 7pm potluck gathering, 7:45/8pm fireworks",
      frequency: "*First Friday of the month only*",
      icon: "🎆",
      color: "bg-purple-500"
    },
    {
      day: "Saturday",
      time: "7 AM",
      title: "QK Run Club",
      location: "Queen Kapiolani Hotel, 150 Kapahulu Ave",
      meetingPoint: "Hotel lobby",
      description: "Park 5K (3.1 mile), Loop around Diamond Head (4 mile), or brisk walk around the park",
      parking: "Free parking nearby in the Kapiolani Park/Waikiki Shell parking lot on Monsarrat Ave",
      motto: "Run for fun, or run for time!",
      icon: "🏨",
      color: "bg-green-700"
    },
    {
      day: "Sunday",
      time: "6 AM",
      title: "\"Sunday Runday\" Long Run with HOKA",
      location: "HOKA Ala Moana (regular spot)",
      meetingPoint: "HOKA Store",
      description: "Long runs every Sunday morning",
      note: "Other times and locations may vary. See our weekly schedule on Instagram (@hawaiirunningproject) for updated times and locations throughout the year",
      icon: "☀️",
      color: "bg-yellow-500"
    }
  ];

  const renderWorkoutCard = (workout: WorkoutEvent, index: number) => (
    <Card key={`${workout.day}-${index}`} className="card-float p-0 overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Day & Time Section */}
        <div className={`lg:col-span-3 ${workout.color} p-6 text-white flex flex-col justify-center items-center text-center`}>
          <div className="text-4xl mb-2">{workout.icon}</div>
          <h3 className="text-2xl font-display font-bold mb-2">{workout.day}</h3>
          <div className="flex items-center text-xl font-semibold">
            <Clock className="w-5 h-5 mr-2" />
            {workout.time}
          </div>
          {workout.frequency && (
            <p className="text-sm mt-2 font-medium">{workout.frequency}</p>
          )}
        </div>

        {/* Details Section */}
        <div className="lg:col-span-9 p-6">
          <h4 className="text-2xl font-display font-bold text-foreground mb-4">
            {workout.title}
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start mb-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{workout.location}</p>
                  <p className="text-sm text-muted-foreground">Meet: {workout.meetingPoint}</p>
                </div>
              </div>

              <div className="flex items-start mb-3">
                <Calendar className="w-5 h-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-muted-foreground">{workout.description}</p>
              </div>

              {workout.schedule && (
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Schedule:</strong> {workout.schedule}
                  </p>
                </div>
              )}

              {workout.motto && (
                <p className="text-sm font-medium text-accent italic">"{workout.motto}"</p>
              )}
            </div>

            <div>
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-foreground mb-2">🅿️ Parking</h5>
                <p className="text-sm text-muted-foreground">{workout.parking}</p>
              </div>

              {workout.special && (
                <div className="bg-accent/10 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-accent mb-2">✨ Special</h5>
                  <p className="text-sm text-muted-foreground">{workout.special}</p>
                </div>
              )}

              {workout.mixer && (
                <div className="bg-secondary/10 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-secondary mb-2">🍻 Special Event</h5>
                  <p className="text-sm text-muted-foreground">{workout.mixer}</p>
                </div>
              )}

              {workout.note && (
                <div className="bg-primary/10 rounded-lg p-4">
                  <h5 className="font-semibold text-primary mb-2">📍 Note</h5>
                  <p className="text-sm text-muted-foreground">{workout.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="schedule" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient-ocean mb-6">
            Workout Schedule
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Everyone welcome
            </Badge>
            <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              All levels
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-2">
              💚 Free!
            </Badge>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">Connected to your Google Calendar</p>
        </div>

        {/* Workout Schedule Cards */}
        <div className="grid gap-8 mb-16">
          {workoutDays.map((workout, index) => renderWorkoutCard(workout, index))}
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <Card className="card-float p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
              Questions?
            </h3>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-muted-foreground">Email us at:</span>
              <a 
                href="mailto:hawaiirunningproject@gmail.com" 
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                hawaiirunningproject@gmail.com
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WorkoutSchedule;
