import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Volume2, Download, Loader2, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

export const VoiceGenerator = () => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedAudio, setGeneratedAudio] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [voice, setVoice] = useState('female');
  const [language, setLanguage] = useState('en');

  const simulateAudioGeneration = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 150);

    // Simulate audio generation delay
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsGenerating(false);
      
      // Create a simple audio context for demo (silent audio)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
      
      // Add some basic tone generation for demo
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.sin(2 * Math.PI * 440 * i / audioContext.sampleRate) * 0.1;
      }
      
      // Convert to data URL (this is a simplified demo)
      setGeneratedAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYfCjR/zfrHeSsFJnnD7+OOSBY');
      toast.success('Voice generated successfully!');
    }, 3000);
  };

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to generate voice');
      return;
    }
    if (text.length > 1000) {
      toast.error('Text is too long. Please limit to 1000 characters.');
      return;
    }
    simulateAudioGeneration();
  };

  const togglePlayback = () => {
    if (generatedAudio) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        toast.success('Playing generated voice...');
        // Simulate playback time
        setTimeout(() => {
          setIsPlaying(false);
        }, 3000);
      }
    }
  };

  const handleDownload = () => {
    if (generatedAudio) {
      const link = document.createElement('a');
      link.href = generatedAudio;
      link.download = `generated-voice-${Date.now()}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Audio downloaded!');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>
            Enter the text you want to convert to speech
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">Text to Speech</Label>
            <Textarea
              id="text-input"
              placeholder="Enter your text here... (max 1000 characters)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px]"
              maxLength={1000}
            />
            <p className="text-sm text-gray-500">
              Characters: {text.length}/1000
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
          <CardDescription>
            Customize the voice characteristics for your audio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voice-type">Voice Type</Label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female Voice</SelectItem>
                  <SelectItem value="male">Male Voice</SelectItem>
                  <SelectItem value="child">Child Voice</SelectItem>
                  <SelectItem value="elderly">Elderly Voice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="speed">Speed: {speed[0]}x</Label>
            <Slider
              id="speed"
              min={0.5}
              max={2}
              step={0.1}
              value={speed}
              onValueChange={setSpeed}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pitch">Pitch: {pitch[0]}x</Label>
            <Slider
              id="pitch"
              min={0.5}
              max={2}
              step={0.1}
              value={pitch}
              onValueChange={setPitch}
              className="w-full"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!text.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Voice...
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                Generate Voice
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="space-y-2">
              <Label>Generation Progress</Label>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">{progress}% complete</p>
            </div>
          )}
        </CardContent>
      </Card>

      {generatedAudio && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Audio</CardTitle>
            <CardDescription>
              Your voice has been generated successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Audio generated from: "{text.slice(0, 50)}{text.length > 50 ? '...' : ''}"
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={togglePlayback} variant="outline">
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Play
                      </>
                    )}
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};