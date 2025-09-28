import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

export function NotFound({ 
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  showBackButton = true,
  showHomeButton = true
}: NotFoundProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 text-[#BF4226] mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-[#1A3E73] mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>

        <div className="space-y-3">
          {showBackButton && (
            <Button 
              onClick={handleBack}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          )}
          
          {showHomeButton && (
            <Button 
              onClick={handleHome}
              className="w-full bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}