"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, Copy, Download, GitFork, Share2, Flag, Check } from 'lucide-react';

interface ActionButtonsProps {
  paste: {
    id: string;
    slug: string;
    title: string;
    content: string;
    syntax: string;
  };
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ paste }) => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (action: string, callback: () => void) => {
    setClickedButton(action);
    callback();
    setTimeout(() => setClickedButton(null), 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/paste/${paste.slug}`);
    // Add a toast notification here
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(paste.content);
    // Add a toast notification here
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([paste.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${paste.title}.${paste.syntax}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const ActionButton: React.FC<{ icon: React.ReactNode, action: string, onClick: () => void, tooltip: string }> = ({ icon, action, onClick, tooltip }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleButtonClick(action, onClick)}
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {clickedButton === action ? <Check className="h-4 w-4 text-green-500" /> : icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton icon={<Link className="h-4 w-4" />} action="copyLink" onClick={handleCopyLink} tooltip="Copy Link" />
      <ActionButton icon={<Copy className="h-4 w-4" />} action="copyContent" onClick={handleCopyContent} tooltip="Copy Content" />
      <ActionButton icon={<Download className="h-4 w-4" />} action="download" onClick={handleDownload} tooltip="Download" />
      <ActionButton icon={<GitFork className="h-4 w-4" />} action="clone" onClick={() => window.location.href = `/clone/${paste.slug}`} tooltip="Clone" />
      <ActionButton icon={<Share2 className="h-4 w-4" />} action="share" onClick={() => {/* Open share modal */}} tooltip="Share" />
      <ActionButton icon={<Flag className="h-4 w-4" />} action="report" onClick={() => window.location.href = '/dmca'} tooltip="Report" />
    </div>
  );
};

export default ActionButtons;