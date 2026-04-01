'use client'

import { useState, useEffect } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (!isBreak) {
              setSessions(sessions + 1);
              // Start break
              setIsBreak(true);
              setMinutes(5);
              setSeconds(0);
            } else {
              // End break
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, sessions]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const startBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setMinutes(5);
    setSeconds(0);
  };

  return (
    <ToolLayout
      title="Pomodoro Timer"
      description="Boost productivity with focused work sessions"
    >
      <div className="space-y-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-center">
              {isBreak ? (
                <span className="flex items-center justify-center gap-2 text-green-500">
                  <Coffee className="h-5 w-5" />
                  Break Time
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 text-blue-500">
                  <Zap className="h-5 w-5" />
                  Focus Time
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-8xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>

              <div className="flex gap-4 justify-center mb-6">
                <Button
                  size="lg"
                  onClick={toggle}
                  className="gap-2 min-w-[120px]"
                >
                  {isActive ? (
                    <>
                      <Pause className="h-5 w-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={reset}
                  className="gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Reset
                </Button>
              </div>

              {!isBreak && (
                <Button
                  variant="ghost"
                  onClick={startBreak}
                  className="gap-2"
                >
                  <Coffee className="h-4 w-4" />
                  Take a Break
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Completed Sessions</p>
              <p className="text-4xl font-bold">{sessions}</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>• Work for 25 minutes with full focus</p>
          <p>• Take a 5-minute break</p>
          <p>• Repeat to boost your productivity</p>
        </div>
      </div>
    </ToolLayout>
  );
}