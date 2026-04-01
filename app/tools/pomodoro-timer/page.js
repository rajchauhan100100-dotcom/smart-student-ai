'use client'

import { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Play, Pause, RotateCcw, Coffee, Zap, Volume2, VolumeX, Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  
  const audioRef = useRef(null);

  // Create audio context for notification sound
  useEffect(() => {
    // Simple beep sound using Web Audio API
    const playNotification = () => {
      if (!soundEnabled) return;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    audioRef.current = playNotification;
  }, [soundEnabled]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            
            // Play sound
            if (audioRef.current) {
              audioRef.current();
            }
            
            // Show browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Pomodoro Timer', {
                body: isBreak ? 'Break finished! Time to work!' : 'Work session complete! Take a break!',
                icon: '/favicon.ico'
              });
            }
            
            if (!isBreak) {
              setSessions(sessions + 1);
              // Start break
              setIsBreak(true);
              setMinutes(breakDuration);
              setSeconds(0);
            } else {
              // End break
              setIsBreak(false);
              setMinutes(workDuration);
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
  }, [isActive, minutes, seconds, isBreak, sessions, workDuration, breakDuration]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workDuration);
    setSeconds(0);
  };

  const startBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setMinutes(breakDuration);
    setSeconds(0);
  };

  const applySettings = () => {
    setIsActive(false);
    setMinutes(isBreak ? breakDuration : workDuration);
    setSeconds(0);
    setShowSettings(false);
  };

  const resetAll = () => {
    if (confirm('Reset everything including session count?')) {
      setIsActive(false);
      setIsBreak(false);
      setMinutes(workDuration);
      setSeconds(0);
      setSessions(0);
    }
  };

  return (
    <ToolLayout
      title="Pomodoro Timer"
      description="Boost productivity with focused work sessions"
    >
      <div className="space-y-6">
        {/* Settings Panel */}
        {showSettings ? (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Timer Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Work Duration (minutes)</Label>
                  <Select value={workDuration.toString()} onValueChange={(v) => setWorkDuration(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="25">25 minutes (default)</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Break Duration (minutes)</Label>
                  <Select value={breakDuration.toString()} onValueChange={(v) => setBreakDuration(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="5">5 minutes (default)</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Sound Notifications</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="gap-2"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="h-4 w-4" />
                      On
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4" />
                      Off
                    </>
                  )}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button onClick={applySettings} className="flex-1">
                  Apply Settings
                </Button>
                <Button onClick={() => setShowSettings(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Main Timer Card */}
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

                  <div className="flex gap-4 justify-center mb-6 flex-wrap">
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
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setShowSettings(true)}
                      className="gap-2"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Button>
                  </div>

                  <div className="flex gap-3 justify-center flex-wrap">
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
                    <Button
                      variant="ghost"
                      onClick={resetAll}
                      className="gap-2 text-muted-foreground"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Completed Sessions</p>
                    <p className="text-4xl font-bold">{sessions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Current Settings</p>
                    <p className="text-lg font-semibold">{workDuration}min / {breakDuration}min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• <strong>Focus:</strong> Work for {workDuration} minutes with full concentration</p>
                  <p>• <strong>Break:</strong> Take a {breakDuration}-minute break to recharge</p>
                  <p>• <strong>Repeat:</strong> Complete multiple sessions for maximum productivity</p>
                  {soundEnabled && <p>• <strong>Notifications:</strong> Sound alerts when timer ends</p>}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
