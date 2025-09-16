import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye } from "lucide-react";

const RevealCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-glow-gold mb-4">
            Next Reveal Event
          </h2>
          <p className="text-lg text-muted-foreground">
            All minted NFTs will be revealed simultaneously
          </p>
        </div>

        <Card className="p-8 bg-mystery-card border-mystery-border glow-purple max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {timeBlocks.map((block, index) => (
              <div key={block.label} className="text-center">
                <div className="bg-crate-gradient border border-mystery-border rounded-lg p-4 mb-2">
                  <div className="text-3xl font-bold text-neon-cyan">
                    {block.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{block.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>December 25, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12:00 UTC</span>
              </div>
            </div>

            <Button variant="reveal" size="xl" className="w-full">
              <Eye className="w-5 h-5" />
              Get Notified for Reveal
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RevealCountdown;