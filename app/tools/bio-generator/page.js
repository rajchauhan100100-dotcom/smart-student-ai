'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '../../../components/ToolLayout';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

export default function BioGenerator() {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    experience: '',
    skills: '',
    achievements: ''
  });
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!formData.name || !formData.profession) return;
    
    setLoading(true);
    setError('');
    setBio('');

    try {
      // Call backend API (secure method)
      const response = await fetch('/api/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details: formData })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate bio');
      }

      if (!data.bio) {
        throw new Error('No bio generated. Please try again.');
      }

      setBio(data.bio);
    } catch (err) {
      setError(err.message || 'Failed to generate bio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Bio Generator"
      toolId="bio-generator"
      category="ai-writing"
      description="Create professional bios for social media and resumes"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Profession *</Label>
                <Input
                  placeholder="Software Engineer"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                placeholder="5 years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Key Skills</Label>
              <Input
                placeholder="React, Node.js, Python"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Notable Achievements (Optional)</Label>
              <Textarea
                placeholder="Led team of 10, increased revenue by 50%"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                className="min-h-[100px]"
                maxLength={500}
              />
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!formData.name || !formData.profession || loading}
            className="w-full mt-4 gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Bio
              </>
            )}
          </Button>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {bio && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">Generated Bio</h3>
                <CopyButton text={bio} />
              </div>
              <p className="text-foreground whitespace-pre-wrap">{bio}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}