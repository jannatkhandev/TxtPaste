import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

const PasteNotFound: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FileQuestion className="mr-2 h-6 w-6" />
          Paste Not Found
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-4">The paste you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button>
            Go to Homepage
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PasteNotFound;