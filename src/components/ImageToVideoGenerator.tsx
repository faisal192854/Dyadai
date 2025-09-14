import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Upload, Play, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const ImageToVideoGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string>('');
  const [duration, setDuration] = useState([5]);
  const [animationType, setAnimationType] = useState('zoom');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Please select a valid image file');
      }
    }
  };

  const simulateVideoGeneration = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate video generation delay
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsGenerating(false);
      
      // Create a simple canvas-based "video" as a data URL for demo
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      
      if (ctx && imagePreview) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Add animation effect overlay
          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          const videoDataUrl = canvas.toDataURL('image/png');
          setGeneratedVideo(videoDataUrl);
          toast.success('Video generated successfully!');
        };
        img.src = imagePreview;
      }
    }, 4000);
  };

  const handleGenerate = () => {
    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }
    simulateVideoGeneration();
  };

  const handleDownload = () => {
    if (generatedVideo) {
      const link = document.createElement('a');
      link.href = generatedVideo;
      link.download = `generated-video-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Video downloaded!');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Upload an image to convert into a video with animation effects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain rounded"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG or GIF (MAX. 10MB)
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Settings</CardTitle>
          <CardDescription>
            Configure the animation and duration for your video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration: {duration[0]} seconds</Label>
            <Slider
              id="duration"
              min={1}
              max={30}
              step={1}
              value={duration}
              onValueChange={setDuration}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="animation">Animation Type</Label>
            <Select value={animationType} onValueChange={setAnimationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select animation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zoom">Zoom In</SelectItem>
                <SelectItem value="pan">Pan Left</SelectItem>
                <SelectItem value="fade">Fade Effect</SelectItem>
                <SelectItem value="rotate">Rotate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!selectedImage || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Generate Video
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

      {generatedVideo && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Video</CardTitle>
            <CardDescription>
              Your video has been generated successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src={generatedVideo}
                alt="Generated Video Preview"
                className="max-w-full h-auto rounded-lg border"
              />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};