import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Eye, Calendar } from 'lucide-react';
import ActionButtons from './ActionButtons'; // Client component
import AceEditorWrapper from './AceEditorWrapper'; // Client component

interface PasteViewProps {
  paste: {
    id: string;
    slug: string;
    title: string;
    content: string;
    syntax: string;
    user: string;
    views: number;
    created_at: string;
  };
}

const PasteView: React.FC<PasteViewProps> = ({ paste }) => {
  const editorTheme = 'github'; // Default theme, can be adjusted server-side if needed

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl font-bold">{paste.title}</CardTitle>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{paste.user}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{paste.views} views</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(paste.created_at)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ActionButtons paste={paste} />

        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <AceEditorWrapper content={paste.content} syntax={paste.syntax} theme={editorTheme} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PasteView;