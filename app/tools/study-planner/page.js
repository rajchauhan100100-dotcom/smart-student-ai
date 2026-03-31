'use client'

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock } from 'lucide-react';

export default function StudyPlanner() {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('7');
  const [hoursPerDay, setHoursPerDay] = useState('2');
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    const days = parseInt(duration);
    const hours = parseInt(hoursPerDay);
    const totalHours = days * hours;
    
    const schedule = [];
    const today = new Date();
    
    // Create a basic study schedule
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const dayPlan = {
        day: i + 1,
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        tasks: []
      };
      
      if (i === 0) {
        dayPlan.tasks.push(`Introduction to ${subject}`);
        dayPlan.tasks.push('Review fundamentals and key concepts');
      } else if (i === days - 1) {
        dayPlan.tasks.push('Review all topics');
        dayPlan.tasks.push('Practice problems and mock tests');
        dayPlan.tasks.push('Final revision');
      } else if (i < days / 2) {
        dayPlan.tasks.push(`Study core concepts of ${subject}`);
        dayPlan.tasks.push('Take notes and practice examples');
      } else {
        dayPlan.tasks.push('Advanced topics and applications');
        dayPlan.tasks.push('Solve practice problems');
      }
      
      dayPlan.tasks.push(`Study time: ${hours} hours`);
      schedule.push(dayPlan);
    }
    
    setPlan({
      subject,
      totalDays: days,
      hoursPerDay: hours,
      totalHours,
      schedule
    });
  };

  const planText = plan ? `
Study Plan for ${plan.subject}
${'='.repeat(50)}

Total Duration: ${plan.totalDays} days
Daily Study Time: ${plan.hoursPerDay} hours
Total Study Hours: ${plan.totalHours} hours

${plan.schedule.map(day => `
Day ${day.day} - ${day.date}
${day.tasks.map(task => `  • ${task}`).join('\n')}
`).join('')}
  ` : '';

  return (
    <ToolLayout
      title="Study Planner Generator"
      description="Generate personalized study schedules"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Subject/Topic</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Biology"
              />
            </div>
            <div className="space-y-2">
              <Label>Study Duration (Days)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Days</SelectItem>
                  <SelectItem value="7">1 Week</SelectItem>
                  <SelectItem value="14">2 Weeks</SelectItem>
                  <SelectItem value="30">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Hours Per Day</Label>
              <Select value={hoursPerDay} onValueChange={setHoursPerDay}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hour</SelectItem>
                  <SelectItem value="2">2 Hours</SelectItem>
                  <SelectItem value="3">3 Hours</SelectItem>
                  <SelectItem value="4">4 Hours</SelectItem>
                  <SelectItem value="5">5 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={generatePlan}
            className="w-full mt-4"
            disabled={!subject}
          >
            Generate Study Plan
          </Button>
        </Card>

        {plan && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.subject}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {plan.totalDays} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {plan.totalHours} total hours
                    </span>
                  </div>
                </div>
                <CopyButton text={planText} />
              </div>

              <div className="space-y-4">
                {plan.schedule.map((day, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                      <div>
                        <p className="font-semibold">Day {day.day}</p>
                        <p className="text-sm text-muted-foreground">{day.date}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {day.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}