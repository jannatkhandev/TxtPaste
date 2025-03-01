"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Eye, Lock, History } from 'lucide-react';

const RecentPastes = () => {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setPastes([
        { id: 1, title: 'JavaScript Snippet', views: 120, created: '2h ago', isPrivate: false },
        { id: 2, title: 'Python Script', views: 85, created: '4h ago', isPrivate: true },
        { id: 3, title: 'CSS Styles', views: 200, created: '1d ago', isPrivate: false },
        { id: 4, title: 'HTML Template', views: 150, created: '2d ago', isPrivate: false },
        { id: 5, title: 'SQL Query', views: 75, created: '3d ago', isPrivate: true },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Recent Pastes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12 rounded-md" />
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {pastes.map((paste) => (
              <li key={paste.id} className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                <div className="flex items-center space-x-2 overflow-hidden">
                  {paste.isPrivate ? <Lock className="w-4 h-4 flex-shrink-0 text-muted-foreground" /> : <Eye className="w-4 h-4 flex-shrink-0 text-muted-foreground" />}
                  <span className="text-sm font-medium truncate">{paste.title}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground whitespace-nowrap">
                  <span>{paste.views} views</span>
                  <Clock className="w-3 h-3" />
                  <span>{paste.created}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPastes;