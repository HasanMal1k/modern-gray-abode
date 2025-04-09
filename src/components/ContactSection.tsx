
import { useState, useRef } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const message = formData.get('message') as string;
      
      // For email sending, you'd typically use a service like EmailJS, FormSpree, or your own backend API
      // This is a simulation - you would replace this with your actual email sending code
      
      // Example with EmailJS API (client-side)
      // Replace this with your actual email sending code when you have the service set up
      console.log("Sending email with data:", { name, email, subject, message });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful submission
      setIsSuccess(true);
      toast({
        title: "Message Sent",
        description: `Thank you ${name}! Your inquiry has been sent to our team. We'll respond to ${email} shortly.`,
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);
      toast({
        title: "Failed to send message",
        description: "An error occurred while sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
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
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
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
          
          <div className="pt-3 flex justify-center">
            <a 
              href="https://wa.me/2348066429700" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white flex items-center text-sm transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0v-2Z" />
                <path d="M14 10a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0v-2Z" />
                <path d="M9 15h6" />
              </svg>
              Or contact us on WhatsApp: +2348066429700
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
