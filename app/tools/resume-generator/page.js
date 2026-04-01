'use client'

import { useState, useEffect } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Download, Plus, X, Copy, Check, Eye, Trash2 } from 'lucide-react';

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
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Add print styles for A4 format
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 15mm;
        }
        body * {
          visibility: hidden;
        }
        #resume-preview, #resume-preview * {
          visibility: visible;
        }
        #resume-preview {
          position: absolute;
          left: 0;
          top: 0;
          width: 210mm;
          background: white;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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

  const generatePreview = () => {
    setShowPreview(true);
  };

  const downloadPDF = () => {
    if (!showPreview) {
      setShowPreview(true);
      setTimeout(() => {
        window.print();
      }, 100);
    } else {
      window.print();
    }
  };

  const copyResume = () => {
    let resumeText = `${personalInfo.name}\n`;
    resumeText += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n\n`;
    
    if (personalInfo.summary) {
      resumeText += `PROFESSIONAL SUMMARY\n${personalInfo.summary}\n\n`;
    }

    resumeText += `EXPERIENCE\n`;
    experiences.forEach(exp => {
      if (exp.title || exp.company) {
        resumeText += `${exp.title}\n`;
        resumeText += `${exp.company} | ${exp.duration}\n`;
        if (exp.description) resumeText += `${exp.description}\n`;
        resumeText += `\n`;
      }
    });

    resumeText += `EDUCATION\n`;
    education.forEach(edu => {
      if (edu.degree || edu.school) {
        resumeText += `${edu.degree}\n`;
        resumeText += `${edu.school} | ${edu.year}\n\n`;
      }
    });

    if (skills) {
      resumeText += `SKILLS\n${skills}\n`;
    }

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setPersonalInfo({ name: '', email: '', phone: '', location: '', summary: '' });
      setExperiences([{ title: '', company: '', duration: '', description: '' }]);
      setEducation([{ degree: '', school: '', year: '' }]);
      setSkills('');
      setShowPreview(false);
    }
  };

  return (
    <ToolLayout
      title="Resume Generator"
      description="Create professional resumes with clean formatting"
      toolId="resume-generator"
      category="resume-job"
    >
      <div className="space-y-8">
        {/* Clear All Button */}
        <div className="flex justify-end no-print">
          <Button
            onClick={clearAll}
            variant="outline"
            size="sm"
            className="gap-2 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="p-6 no-print">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
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
        <Card className="p-6 no-print">
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
        <Card className="p-6 no-print">
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
        <Card className="p-6 no-print">
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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center no-print">
          <Button
            onClick={generatePreview}
            size="lg"
            variant="outline"
            className="gap-2"
            disabled={!personalInfo.name}
          >
            <Eye className="h-5 w-5" />
            Preview Resume
          </Button>
          <Button
            onClick={downloadPDF}
            size="lg"
            className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            disabled={!personalInfo.name}
          >
            <Download className="h-5 w-5" />
            Download PDF
          </Button>
          <Button
            onClick={copyResume}
            size="lg"
            variant="outline"
            className="gap-2"
            disabled={!personalInfo.name}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy Text
              </>
            )}
          </Button>
        </div>

        {/* Resume Preview - A4 Format */}
        {showPreview && personalInfo.name && (
          <Card id="resume-preview" className="p-12 bg-white text-black" style={{ 
            maxWidth: '210mm',
            minHeight: '297mm',
            margin: '0 auto',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}>
            <div className="space-y-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt', lineHeight: '1.5' }}>
              {/* Header */}
              <div className="text-center border-b-2 border-black pb-4">
                <h1 className="text-3xl font-bold mb-2" style={{ fontSize: '24pt' }}>{personalInfo.name}</h1>
                <p className="text-sm" style={{ fontSize: '10pt' }}>
                  {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' | ')}
                </p>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div>
                  <h2 className="text-lg font-bold mb-2 uppercase" style={{ fontSize: '13pt', borderBottom: '1px solid #333', paddingBottom: '4px' }}>Professional Summary</h2>
                  <p className="text-sm" style={{ textAlign: 'justify' }}>{personalInfo.summary}</p>
                </div>
              )}

              {/* Experience */}
              {experiences.some(exp => exp.title || exp.company) && (
                <div>
                  <h2 className="text-lg font-bold mb-3 uppercase" style={{ fontSize: '13pt', borderBottom: '1px solid #333', paddingBottom: '4px' }}>Experience</h2>
                  {experiences.map((exp, index) => (
                    exp.title || exp.company ? (
                      <div key={index} className="mb-4">
                        <h3 className="font-bold text-base" style={{ fontSize: '12pt' }}>{exp.title}</h3>
                        <p className="text-sm italic mb-1" style={{ fontSize: '10pt' }}>{exp.company} | {exp.duration}</p>
                        {exp.description && <p className="text-sm" style={{ textAlign: 'justify' }}>{exp.description}</p>}
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {/* Education */}
              {education.some(edu => edu.degree || edu.school) && (
                <div>
                  <h2 className="text-lg font-bold mb-3 uppercase" style={{ fontSize: '13pt', borderBottom: '1px solid #333', paddingBottom: '4px' }}>Education</h2>
                  {education.map((edu, index) => (
                    edu.degree || edu.school ? (
                      <div key={index} className="mb-3">
                        <h3 className="font-bold text-base" style={{ fontSize: '12pt' }}>{edu.degree}</h3>
                        <p className="text-sm italic" style={{ fontSize: '10pt' }}>{edu.school} | {edu.year}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {/* Skills */}
              {skills && (
                <div>
                  <h2 className="text-lg font-bold mb-3 uppercase" style={{ fontSize: '13pt', borderBottom: '1px solid #333', paddingBottom: '4px' }}>Skills</h2>
                  <p className="text-sm">
                    {skills.split(',').map(skill => skill.trim()).join(' • ')}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
