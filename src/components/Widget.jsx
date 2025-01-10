import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tailwindStyles from "../index.css?inline";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    // Convert projectId from string to integer
    const p_project_id = parseInt(projectId, 10);  // 10 means base-10 (decimal)
  
    const data = {
      p_project_id,  
      p_user_name: form.name.value,
      p_user_email: form.email.value,
      p_message: form.feedback.value,
      p_rating: rating,  
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/add_feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(data),
      });
  
      const returnedData = await response.json();
  
      if (response.ok) {
        setSubmitted(true); 
        console.log('Success:', returnedData);
      } else {
        setError(returnedData.message || "Error submitting feedback, please try again.");
        console.error("Error response:", returnedData);
      }
    } catch (err) {
      setError("Error submitting feedback, please try again.");
      console.error("Network Error:", err);
    }
  }

  return (
    <>
    <style>{tailwindStyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105">
              <MessageCircleIcon className="mr-2 h-5 w-5"/>
              Feedback
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="widget rounded-lg bg-card 
        p-4 shadow-lg w-full max-w-md"
          >
    <style>{tailwindStyles}</style>
            {submitted ? (
              <div>
                <h3 className="text-g font-bold">
                  Thank you for your feedback!
                </h3>
                <p className="mt-4">
                  We appreciate your feedback. It helps us imporve our product
                  and provide better service to our customers.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">Send us your Feedback</h3>
                <form className="space-y-2" onSubmit={submit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter you name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter you email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tell us what you think"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-5 w-5 cursor-pointer
                 ${
                   rating > index
                     ? "fill-primary"
                     : "fill-muted stroke-muted-foreground"
                 }`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round" 
    >
      <path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31
       4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 
       .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 
       1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 
       1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 
       1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
      />
    </svg>
  );
}
function MessageCircleIcon(props) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-message-circle"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
