// components/AccountForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

interface Props {
  user: User;
  profile: Profile | null;
}

export default function AccountForm({ user, profile }: Props) {
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!profile) {
      setIsModalOpen(true);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile();
  };

  const updateProfile = async () => {
    const profileData = { 
      id: user.id, 
      full_name: fullName, 
      username, 
      avatar_url: avatarUrl 
    };

    try {
      const response = await fetch(`/api/profile${profile ? `?userId=${user.id}` : ''}`, {
        method: profile ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedProfile = await response.json();

      toast({
        title: profile ? "Profile updated" : "Profile created",
        description: profile ? "Your profile has been successfully updated." : "Your profile has been successfully created.",
      });

      if (!profile) {
        setIsModalOpen(false);
      }

      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const ProfileForm = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Enter avatar URL"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>Avatar Preview</span>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        {profile ? "Update Profile" : "Create Profile"}
      </Button>
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {profile && <ProfileForm />}
      </form>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Profile</DialogTitle>
            <DialogDescription>
              Please provide some information to set up your profile.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <ProfileForm />
          </form>
          <DialogFooter>
            <Button type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}