"use client";

import { Button } from "@/components/ui/button";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 dark:from-background dark:to-background/80 z-0" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-chart-1/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-chart-2/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-chart-3/20 rounded-full blur-3xl" />
      </div>
      
      {/* Floating Code Snippets */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-20 top-40 opacity-10 dark:opacity-5 transform rotate-12">
          <pre className="text-xs sm:text-sm font-mono">
            {`
AES-256-GCM
0x7f3a21e9b8c5d6f0
Encrypted: true
Expiry: 7 days
            `}
          </pre>
        </div>
        <div className="absolute -left-10 bottom-20 opacity-10 dark:opacity-5 transform -rotate-6">
          <pre className="text-xs sm:text-sm font-mono">
            {`
SHA-256
Password Protected
End-to-End Encrypted
No Logs Kept
            `}
          </pre>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
            {/* Security Icon */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-2"
            >
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-background border border-border p-4 rounded-full shadow-lg">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
            >
              World's Safest Text Sharing Website
            </motion.h1>
            
            {/* Subheading */}
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-normal max-w-2xl"
            >
              Even we can't read your password-protected pastes!
            </motion.h2>
            
            {/* Encryption Visualization */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center justify-center w-full max-w-md mx-auto py-6"
            >
              <div className="relative w-full h-16 bg-muted/50 rounded-lg overflow-hidden backdrop-blur-sm border border-border">
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-mono">Text is encrypted...</span>
                  </div>
                  <div className="h-2 w-24 bg-muted-foreground/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                      className="h-full bg-gradient-to-r from-chart-1 to-chart-2"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
            >
              <Button size="lg" className="w-full sm:w-auto group">
                Create a Paste
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                How it works?
              </Button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-chart-1 mr-2" />
                <span>End-to-End Encryption</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-chart-2 mr-2" />
                <span>No Data Logging</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-chart-3 mr-2" />
                <span>Password Protection</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}