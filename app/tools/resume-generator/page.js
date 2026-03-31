'use client'

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Plus, X } from 'lucide-react';

export default function ResumeGenerator() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState([{
    title: '',
    company: '',
    duration: '',
    description: ''
  }]);

  const [education, setEducation] = useState([{
    degree: '',
    school: '',
    year: ''
  }]);

  const [skills, setSkills] = useState('');

  const addExperience = () => {
    setExperiences([...experiences, { title: '', company: '', duration: '', description: '' }]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', school: '', year: '' }]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const downloadResume = () => {
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${personalInfo.name} - Resume</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #333; margin-bottom: 5px; }
    h2 { color: #666; border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 25px; }
    .contact { color: #666; margin-bottom: 20px; }
    .section-item { margin-bottom: 20px; }
    .job-title { font-weight: bold; }
    .company { color: #666; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill { background: #f0f0f0; padding: 5px 15px; border-radius: 15px; }
  </style>
</head>
<body>
  <h1>${personalInfo.name}</h1>
  <div class="contact">
    ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
  </div>
  
  ${personalInfo.summary ? `<p>${personalInfo.summary}</p>` : ''}
  
  <h2>Experience</h2>
  ${experiences.map(exp => `
    <div class="section-item">
      <div class="job-title">${exp.title}</div>
      <div class="company">${exp.company} | ${exp.duration}</div>
      <p>${exp.description}</p>
    </div>
  `).join('')}
  
  <h2>Education</h2>
  ${education.map(edu => `
    <div class="section-item">
      <div class="job-title">${edu.degree}</div>
      <div class="company">${edu.school} | ${edu.year}</div>
    </div>
  `).join('')}
  
  ${skills ? `
    <h2>Skills</h2>
    <div class="skills">
      ${skills.split(',').map(skill => `<span class="skill">${skill.trim()}</span>`).join('')}
    </div>
  ` : ''}
</body>
</html>
    `;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.html`;
    a.click();
  };

  return (
    <ToolLayout
      title="Resume Generator"
      description="Create professional resumes with clean formatting"
    >
      <div className="space-y-8">
        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                placeholder="City, State"
              />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label>Professional Summary</Label>
            <Textarea
              value={personalInfo.summary}
              onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
              placeholder="Brief summary of your professional background..."
              className="min-h-[100px]"
            />
          </div>
        </Card>

        {/* Experience */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Experience</h3>
            <Button onClick={addExperience} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Experience {index + 1}</h4>
                {experiences.length > 1 && (
                  <Button
                    onClick={() => removeExperience(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => {
                      const newExp = [...experiences];
                      newExp[index].title = e.target.value;
                      setExperiences(newExp);
                    }}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...experiences];
                      newExp[index].company = e.target.value;
                      setExperiences(newExp);
                    }}
                    placeholder="Tech Corp"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Duration</Label>
                  <Input
                    value={exp.duration}
                    onChange={(e) => {
                      const newExp = [...experiences];
                      newExp[index].duration = e.target.value;
                      setExperiences(newExp);
                    }}
                    placeholder="Jan 2020 - Present"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...experiences];
                      newExp[index].description = e.target.value;
                      setExperiences(newExp);
                    }}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Education */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education</h3>
            <Button onClick={addEducation} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Education {index + 1}</h4>
                {education.length > 1 && (
                  <Button
                    onClick={() => removeEducation(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].degree = e.target.value;
                      setEducation(newEdu);
                    }}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>School</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].school = e.target.value;
                      setEducation(newEdu);
                    }}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].year = e.target.value;
                      setEducation(newEdu);
                    }}
                    placeholder="2018 - 2022"
                  />
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Skills */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="space-y-2">
            <Label>Skills (comma-separated)</Label>
            <Textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="JavaScript, React, Node.js, Python, SQL"
            />
          </div>
        </Card>

        {/* Download Button */}
        <div className="flex justify-center">
          <Button
            onClick={downloadResume}
            size="lg"
            className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Download className="h-5 w-5" />
            Download Resume
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}