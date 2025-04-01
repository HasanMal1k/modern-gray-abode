
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. We'll be in touch shortly.",
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <Card className="bg-[#222]/50 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Send Us a Message</CardTitle>
        <CardDescription className="text-white/70">
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-white/80">
                Name
              </label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-white/80">
                Email
              </label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                placeholder="Your email"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm text-white/80">
              Subject
            </label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="What's this about?"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-white/80">
              Message
            </label>
            <Textarea 
              id="message" 
              name="message" 
              rows={4}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none min-h-[120px]"
              placeholder="Your message here..."
            />
          </div>
          
          <div>
            <Button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className={`w-full ${
                isSuccess 
                  ? 'bg-green-600/80 text-white hover:bg-green-600/80'
                  : 'bg-white text-black hover:bg-white/90'
              } transition-colors duration-300`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center justify-center">
                  <Check className="w-4 h-4 mr-2" />
                  Sent Successfully
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
