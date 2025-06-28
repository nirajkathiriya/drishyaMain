import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Video, Music, X, Paperclip, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface FileUploadNotesProps {
  files: File[];
  notes: string;
  instructions: string;
  onFilesChange: (files: File[]) => void;
  onNotesChange: (notes: string) => void;
  onInstructionsChange: (instructions: string) => void;
}

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

export function FileUploadNotes({ 
  files, 
  notes, 
  instructions, 
  onFilesChange, 
  onNotesChange, 
  onInstructionsChange 
}: FileUploadNotesProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 50MB.`);
        return false;
      }
      return true;
    });

    const processedFiles = validFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    const updatedFiles = [...uploadedFiles, ...processedFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles.map(f => f.file));
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== id);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles.map(f => f.file));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType.startsWith('video/')) return Video;
    if (fileType.startsWith('audio/')) return Music;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Files & Instructions</h3>
        <p className="text-gray-600">Upload reference materials, brand assets, or any files that will help us create your perfect video. Add detailed notes and instructions.</p>
      </div>

      {/* File Upload Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center">
              <Paperclip className="h-5 w-5 mr-2 text-purple-600" />
              File Attachments
            </h4>
            <p className="text-sm text-gray-600">Upload logos, brand guidelines, reference videos, audio files, or any materials that will help us understand your vision.</p>
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.mp3,.wav,.pdf,.doc,.docx,.txt,.ppt,.pptx,.zip,.rar"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-2">
                  Drop files here or click to browse
                </h5>
                <p className="text-gray-600 text-sm">
                  Support for images, videos, audio, documents, and archives
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Maximum file size: 50MB per file
                </p>
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="mx-auto"
              >
                Choose Files
              </Button>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Uploaded Files ({uploadedFiles.length})</h5>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploadedFiles.map((uploadedFile) => {
                  const FileIcon = getFileIcon(uploadedFile.file.type);
                  
                  return (
                    <div key={uploadedFile.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border">
                      {uploadedFile.preview ? (
                        <img 
                          src={uploadedFile.preview} 
                          alt={uploadedFile.file.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                          <FileIcon className="h-6 w-6 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedFile.file.size)} • {uploadedFile.file.type || 'Unknown type'}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => removeFile(uploadedFile.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* File Type Guidelines */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Supported File Types
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div>
                <strong>Images:</strong> JPG, PNG, GIF
              </div>
              <div>
                <strong>Videos:</strong> MP4, MOV, AVI
              </div>
              <div>
                <strong>Audio:</strong> MP3, WAV
              </div>
              <div>
                <strong>Documents:</strong> PDF, DOC, DOCX, TXT, PPT
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions Section */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
              Detailed Instructions
            </h4>
            <p className="text-sm text-gray-600">Provide specific instructions about your video requirements, style preferences, and any special requests.</p>
          </div>

          <textarea
            value={instructions}
            onChange={(e) => onInstructionsChange(e.target.value)}
            placeholder="Please provide detailed instructions for your video:

• What is the main goal of this video?
• Who is your target audience?
• What tone/style do you prefer?
• Any specific scenes or shots you want?
• Brand colors or visual preferences?
• Call-to-action requirements?
• Any specific timing or pacing preferences?
• Special effects or animations needed?

The more details you provide, the better we can create your perfect video!"
            className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Be as specific as possible to help our team understand your vision
            </p>
            <p className="text-xs text-gray-400">
              {instructions.length} characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes Section */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-orange-600" />
              Additional Notes & Context
            </h4>
            <p className="text-sm text-gray-600">Any additional information, context, or special requirements that might help us create the perfect video for you.</p>
          </div>

          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Additional notes, context, or requirements:

• Company background or industry context
• Previous video examples you liked
• Things to avoid or exclude
• Deadline considerations
• Budget constraints or preferences
• Technical requirements (resolution, format, etc.)
• Distribution channels (social media, website, etc.)
• Any other relevant information..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Optional but helpful for creating the best possible video
            </p>
            <p className="text-xs text-gray-400">
              {notes.length} characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      {(uploadedFiles.length > 0 || instructions.trim() || notes.trim()) && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <h4 className="text-md font-semibold text-purple-900 mb-3">📋 Submission Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700">Files Attached:</span>
                <span className="font-semibold text-purple-900">{uploadedFiles.length} files</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Instructions:</span>
                <span className="font-semibold text-purple-900">
                  {instructions.trim() ? `${instructions.length} characters` : 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Additional Notes:</span>
                <span className="font-semibold text-purple-900">
                  {notes.trim() ? `${notes.length} characters` : 'Not provided'}
                </span>
              </div>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4 pt-3 border-t border-purple-200">
                <p className="text-xs text-purple-600">
                  <strong>Note:</strong> All uploaded files will be securely stored and only used for your video creation. 
                  Files are automatically deleted after project completion.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}