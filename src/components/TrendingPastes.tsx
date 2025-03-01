"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Lock, TrendingUp } from 'lucide-react';

const TrendingPastes = () => {
  const [activeTab, setActiveTab] = useState('week');

  const trendingData = {
    week: [
      { id: 1, title: 'React Hooks Tutorial', views: 1200, isPrivate: false },
      { id: 2, title: 'Python Data Analysis', views: 980, isPrivate: false },
      { id: 3, title: 'CSS Grid Layout', views: 850, isPrivate: false },
    ],
    month: [
      { id: 4, title: 'JavaScript ES6 Features', views: 3500, isPrivate: false },
      { id: 5, title: 'Machine Learning Basics', views: 3200, isPrivate: false },
      { id: 6, title: 'Docker for Beginners', views: 2900, isPrivate: false },
    ],
    year: [
      { id: 7, title: 'Complete Web Dev Guide', views: 15000, isPrivate: false },
      { id: 8, title: 'Data Structures in Java', views: 12000, isPrivate: false },
      { id: 9, title: 'Advanced SQL Techniques', views: 10000, isPrivate: false },
    ],
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Trending Pastes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
          {Object.entries(trendingData).map(([period, pastes]) => (
            <TabsContent key={period} value={period}>
              <ul className="space-y-2">
                {pastes.map((paste) => (
                  <li key={paste.id} className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      {paste.isPrivate ? <Lock className="w-4 h-4 flex-shrink-0 text-muted-foreground" /> : <Eye className="w-4 h-4 flex-shrink-0 text-muted-foreground" />}
                      <span className="text-sm font-medium truncate">{paste.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {paste.views} views
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendingPastes;