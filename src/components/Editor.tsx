"use client"
import React, { useState, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit2, Eye, EyeOff, Lock, Unlock, Code, Clock, Upload, Loader2 } from 'lucide-react';
import AceEditorWrapper from './AceEditorWrapper';
import { useToast } from '@/hooks/use-toast';
import { createSupabaseClient } from '@/auth/client';
import { useRouter } from 'next/navigation';

const PasteEditor = () => {
  const [title, setTitle] = useState('Untitled Paste');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [syntax, setSyntax] = useState('text');
  const [expiration, setExpiration] = useState('never');
  const [isPublic, setIsPublic] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createSupabaseClient();
  
  const syntaxOptions = [
    { value: 'text', label: 'Plain Text' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'golang', label: 'Go' },
    { value: 'sql', label: 'SQL' },
    { value: 'markdown', label: 'Markdown' },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };
  const handleCreatePaste = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }
  
      let expiryDate = null;
      switch (expiration) {
        case 'onetime':
          expiryDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();
          break;
        case '1hour':
          expiryDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();
          break;
        case '1day':
          expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          break;
        case '1week':
          expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case '1month':
          expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case '1year':
          expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
          break;
        default:
          expiryDate = new Date(Date.now() + 36500 * 60 * 1000).toISOString();
      }
  
      const newPaste = {
        title,
        content,
        syntax,
        expiry: expiryDate,
        privacy: isPublic ? 'public' : 'private',  // Assuming 'privacy' is used instead of 'is_public'
        isEncrypted: isPasswordProtected ? password : null,
        user_id: user.id,
        slug: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      };
  
      const { data, error } = await supabase
        .from('pastes')
        .insert([newPaste])
        .select()
        .single();
  
      if (error) throw error;
  
      toast({
        title: "Paste created",
        description: "Your paste has been successfully created.",
      });
  
      // Redirect to the new paste
      router.push(`/paste/${data.slug}`);
    } catch (error) {
      console.error('Error creating paste:', error);
      toast({
        title: "Error",
        description: "Failed to create paste. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isEditingTitle ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              className="text-xl sm:text-2xl font-bold"
              autoFocus
            />
          ) : (
            <span
              className="text-xl sm:text-2xl font-bold cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsEditingTitle(true)}
            >
              {title}
            </span>
          )}
          <Edit2 
            className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsEditingTitle(true)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-muted-foreground" />
            <Select value={syntax} onValueChange={setSyntax}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Syntax" />
              </SelectTrigger>
              <SelectContent>
                {syntaxOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <Select value={expiration} onValueChange={setExpiration}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Expiration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="onetime">One Time View</SelectItem>
                <SelectItem value="1hour">1 Hour</SelectItem>
                <SelectItem value="1day">1 Day</SelectItem>
                <SelectItem value="1week">1 Week</SelectItem>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPublic(!isPublic)}
                >
                  {isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPublic ? 'Public' : 'Private'} Paste</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPasswordProtected(!isPasswordProtected)}
                >
                  {isPasswordProtected ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPasswordProtected ? 'Password Protected' : 'No Password'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isPasswordProtected && (
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[140px]"
            />
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.js,.py,.html,.css,.java,.cs,.ts,.php,.rb,.go,.sql,.md"
            style={{ display: 'none' }}
          />
        </div>
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <AceEditorWrapper
            content={content}
            syntax={syntax}
            onChange={setContent}
            showGutter={true}
            height="400px"
            width="100%"
            fontSize={14}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={false}
            enableSnippets={false}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full sm:w-auto" 
          onClick={handleCreatePaste}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create New Paste"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasteEditor;