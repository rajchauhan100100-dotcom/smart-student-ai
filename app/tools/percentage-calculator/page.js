'use client'

import { useState } from 'react';
import { ToolLayout } from '../../../components/ToolLayout';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [percent, setPercent] = useState('');
  const [total, setTotal] = useState('');
  const [part, setPart] = useState('');
  const [original, setOriginal] = useState('');
  const [newValue, setNewValue] = useState('');

  const calculatePercentage = () => {
    if (!value || !percent) return '';
    return ((parseFloat(value) * parseFloat(percent)) / 100).toFixed(2);
  };

  const calculatePercentOf = () => {
    if (!part || !total) return '';
    return ((parseFloat(part) / parseFloat(total)) * 100).toFixed(2);
  };

  const calculatePercentChange = () => {
    if (!original || !newValue) return '';
    const change = ((parseFloat(newValue) - parseFloat(original)) / parseFloat(original)) * 100;
    return change.toFixed(2);
  };

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages, increase, and decrease easily"
    >
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">What is X% of Y?</TabsTrigger>
          <TabsTrigger value="reverse">X is what % of Y?</TabsTrigger>
          <TabsTrigger value="change">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Percentage</CardTitle>
              <CardDescription>What is X% of Y?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Percentage (%)</Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    type="number"
                    placeholder="200"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Result:</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {calculatePercentage() || '0'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reverse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reverse Percentage</CardTitle>
              <CardDescription>X is what % of Y?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Part (X)</Label>
                  <Input
                    type="number"
                    placeholder="50"
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total (Y)</Label>
                  <Input
                    type="number"
                    placeholder="200"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Result:</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {calculatePercentOf() || '0'}%
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Change</CardTitle>
              <CardDescription>Calculate the percentage increase or decrease</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Original Value</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Value</Label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Percentage Change:</p>
                <p className={`text-4xl font-bold ${
                  parseFloat(calculatePercentChange()) > 0 
                    ? 'text-green-500' 
                    : parseFloat(calculatePercentChange()) < 0 
                    ? 'text-red-500' 
                    : 'text-muted-foreground'
                }`}>
                  {calculatePercentChange() || '0'}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {parseFloat(calculatePercentChange()) > 0 ? '↑ Increase' : parseFloat(calculatePercentChange()) < 0 ? '↓ Decrease' : 'No Change'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
}