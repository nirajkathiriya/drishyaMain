import React, { useState } from 'react';
import { Upload, FileText, HelpCircle, Users, Clock, Target, Palette, Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface ScriptUploadProps {
  script: string;
  needsScriptHelp: boolean;
  scriptRequirements: {
    targetAudience: string;
    keyMessages: string;
    duration: string;
    brandGuidelines: string;
  };
  onScriptChange: (script: string) => void;
  onNeedsHelpChange: (needsHelp: boolean) => void;
  onRequirementsChange: (requirements: any) => void;
}

export function ScriptUpload({ 
  script, 
  needsScriptHelp, 
  scriptRequirements,
  onScriptChange, 
  onNeedsHelpChange,
  onRequirementsChange 
}: ScriptUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const validTypes = ['.txt', '.doc', '.docx', '.pdf'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      alert('Please upload a valid document file (.txt, .doc, .docx, .pdf)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    
    // Simulate file reading for demo
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onScriptChange(e.target.result);
      }
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    onScriptChange('');
  };

  const durationOptions = [
    { value: '30-seconds', label: '30 seconds', description: 'Perfect for social media ads' },
    { value: '60-seconds', label: '1 minute', description: 'Ideal for product demos' },
    { value: '2-minutes', label: '2 minutes', description: 'Great for explainer videos' },
    { value: '3-5-minutes', label: '3-5 minutes', description: 'Comprehensive tutorials' },
    { value: 'custom', label: 'Custom length', description: 'Specify your requirements' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">Script Options</h3>
        <p className="text-gray-300 text-lg">Choose whether you have your own script ready or need our professional scriptwriting service.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Option 1: Upload Your Script */}
        <Card className={`cursor-pointer transition-all duration-300 ${!needsScriptHelp ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'card-professional hover:shadow-lg'}`}>
          <CardContent className="p-6" onClick={() => onNeedsHelpChange(false)}>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-white">Option 1: Upload Your Script</h4>
                <p className="text-gray-300">I have my script ready</p>
                <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                  FREE - No additional cost
                </div>
              </div>
            </div>
            
            {!needsScriptHelp && (
              <div className="space-y-6">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paste Your Script Here
                  </label>
                  <textarea
                    placeholder="Paste your complete script here... 

Example:
'Hi there! Welcome to our amazing product demo. Today I'll show you how our solution can transform your business in just 3 simple steps...'

Tips:
- Write in a conversational tone
- Include clear call-to-actions
- Keep sentences short and punchy
- Add pauses with commas or periods"
                    value={script}
                    onChange={(e) => onScriptChange(e.target.value)}
                    className="w-full h-40 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      Write naturally - our AI will handle timing and delivery
                    </p>
                    <p className="text-xs text-gray-400">
                      {script.length} characters • ~{Math.ceil(script.length / 150)} seconds
                    </p>
                  </div>
                </div>

                {/* File Upload */}
                <div className="border-t border-gray-700 pt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Or Upload a Document
                  </label>
                  
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                      dragActive 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-gray-600 hover:border-purple-400 hover:bg-gray-800/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                      className="hidden"
                      id="script-upload"
                      accept=".txt,.doc,.docx,.pdf"
                    />
                    
                    {uploadedFile ? (
                      <div className="space-y-3">
                        <div className="bg-green-500/20 p-4 rounded-lg">
                          <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
                          <p className="text-green-300 font-medium">{uploadedFile.name}</p>
                          <p className="text-green-400 text-sm">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={removeFile}
                          className="text-red-400 border-red-400 hover:bg-red-500/10"
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-white font-medium mb-1">
                            Drop your script file here or click to browse
                          </p>
                          <p className="text-gray-400 text-sm">
                            Supports .txt, .doc, .docx, .pdf files (max 10MB)
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => document.getElementById('script-upload')?.click()}
                          className="glass border-white/20 text-white hover:bg-white/10"
                        >
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Option 2: Professional Script Writing */}
        <Card className={`cursor-pointer transition-all duration-300 ${needsScriptHelp ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'card-professional hover:shadow-lg'}`}>
          <CardContent className="p-6" onClick={() => onNeedsHelpChange(true)}>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-white">Option 2: Professional Script Writing</h4>
                <p className="text-gray-300">Let our experts create your script</p>
                <div className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                  +$8 - Professional service
                </div>
              </div>
            </div>
            
            {needsScriptHelp && (
              <div className="space-y-6">
                {/* Target Audience */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <Users className="h-4 w-4 mr-2 text-blue-400" />
                    Target Audience *
                  </label>
                  <textarea
                    placeholder="Describe your target audience:

• Demographics (age, profession, interests)
• Pain points and challenges
• What motivates them?
• How tech-savvy are they?

Example: 'Small business owners aged 30-50 who struggle with time management and are looking for simple, effective solutions to streamline their operations.'"
                    value={scriptRequirements.targetAudience}
                    onChange={(e) => onRequirementsChange({
                      ...scriptRequirements,
                      targetAudience: e.target.value
                    })}
                    className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Key Messages */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <Target className="h-4 w-4 mr-2 text-green-400" />
                    Key Messages & Call-to-Action *
                  </label>
                  <textarea
                    placeholder="What are the main points you want to communicate?

• Primary benefit/value proposition
• Key features to highlight
• Desired action from viewers
• Any specific messaging requirements

Example: 'Highlight our 50% time savings, ease of use, and 24/7 support. Call-to-action should be to start a free trial with urgency around limited-time offer.'"
                    value={scriptRequirements.keyMessages}
                    onChange={(e) => onRequirementsChange({
                      ...scriptRequirements,
                      keyMessages: e.target.value
                    })}
                    className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Desired Duration */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <Clock className="h-4 w-4 mr-2 text-purple-400" />
                    Desired Duration *
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {durationOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          scriptRequirements.duration === option.value
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={option.value}
                          checked={scriptRequirements.duration === option.value}
                          onChange={(e) => onRequirementsChange({
                            ...scriptRequirements,
                            duration: e.target.value
                          })}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.description}</div>
                        </div>
                        {scriptRequirements.duration === option.value && (
                          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Guidelines */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <Palette className="h-4 w-4 mr-2 text-orange-400" />
                    Brand Guidelines & Style
                  </label>
                  <textarea
                    placeholder="Tell us about your brand voice and style:

• Brand personality (professional, friendly, innovative, etc.)
• Tone preferences (formal, casual, energetic, etc.)
• Words/phrases to include or avoid
• Any brand-specific terminology
• Examples of content you like

Example: 'We're a tech startup with a friendly, approachable voice. Avoid jargon, use simple language, and emphasize innovation and reliability. Think Apple meets Slack in terms of tone.'"
                    value={scriptRequirements.brandGuidelines}
                    onChange={(e) => onRequirementsChange({
                      ...scriptRequirements,
                      brandGuidelines: e.target.value
                    })}
                    className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Service Details */}
      {needsScriptHelp && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-300 mb-4">✨ Professional Script Writing Service</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-green-200 mb-2">What's Included:</h5>
              <ul className="space-y-1 text-sm text-green-300">
                <li className="flex items-center"><Plus className="h-3 w-3 mr-2" />Professional copywriter assigned</li>
                <li className="flex items-center"><Plus className="h-3 w-3 mr-2" />Conversion-optimized script</li>
                <li className="flex items-center"><Plus className="h-3 w-3 mr-2" />Brand voice alignment</li>
                <li className="flex items-center"><Plus className="h-3 w-3 mr-2" />1 round of revisions included</li>
                <li className="flex items-center"><Plus className="h-3 w-3 mr-2" />Delivery timing optimization</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-green-200 mb-2">Our Process:</h5>
              <ul className="space-y-1 text-sm text-green-300">
                <li className="flex items-center"><span className="w-4 h-4 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">1</span>Review your requirements</li>
                <li className="flex items-center"><span className="w-4 h-4 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">2</span>Research your audience</li>
                <li className="flex items-center"><span className="w-4 h-4 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">3</span>Create compelling script</li>
                <li className="flex items-center"><span className="w-4 h-4 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">4</span>Optimize for your avatar</li>
                <li className="flex items-center"><span className="w-4 h-4 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">5</span>Deliver final script</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Script Guidelines */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
        <h4 className="text-lg font-bold text-blue-300 mb-4">📝 Script Guidelines & Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-blue-200 mb-2">Best Practices:</h5>
            <ul className="space-y-1 text-sm text-blue-300">
              <li>• Write in a conversational tone</li>
              <li>• Use short, punchy sentences</li>
              <li>• Include clear call-to-actions</li>
              <li>• Add natural pauses with punctuation</li>
              <li>• Avoid complex jargon or acronyms</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-200 mb-2">Length Guidelines:</h5>
            <ul className="space-y-1 text-sm text-blue-300">
              <li>• Basic plan: up to 150 words (60 seconds)</li>
              <li>• Standard plan: up to 300 words (2 minutes)</li>
              <li>• Premium plan: up to 750 words (5 minutes)</li>
              <li>• Speaking rate: ~150 words per minute</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {(script.trim() || needsScriptHelp) && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-300 mb-2">✓ Script Option Selected</h4>
          {needsScriptHelp ? (
            <div>
              <p className="text-green-200 mb-2">
                <strong>Professional Script Writing Service</strong> (+$8)
              </p>
              <p className="text-sm text-green-300">
                Our expert copywriters will create a conversion-optimized script based on your requirements.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-green-200 mb-2">
                <strong>Your Own Script</strong> (Free)
              </p>
              <p className="text-sm text-green-300">
                Script length: {script.length} characters (~{Math.ceil(script.length / 150)} seconds)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}