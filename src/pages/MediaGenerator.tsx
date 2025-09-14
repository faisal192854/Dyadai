import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageToVideoGenerator } from '@/components/ImageToVideoGenerator';
import { VoiceGenerator } from '@/components/VoiceGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MediaGenerator = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">AI Media Generator</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create videos from images and generate AI voices
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Media Generation Tools</CardTitle>
            <CardDescription>
              Transform your images into videos or generate AI voices from text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="image-to-video" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image-to-video">Image to Video</TabsTrigger>
                <TabsTrigger value="voice-generator">Voice Generator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="image-to-video" className="mt-6">
                <ImageToVideoGenerator />
              </TabsContent>
              
              <TabsContent value="voice-generator" className="mt-6">
                <VoiceGenerator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MediaGenerator;