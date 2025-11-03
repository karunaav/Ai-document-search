import { useState } from 'react';

function FileUpload({ onFileUpload, isLoading }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        alert('Please drop a PDF file');
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-500 bg-opacity-10'
              : 'border-slate-400 hover:border-slate-300'
          }`}
        >
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-9"
              />
            </svg>
          </div>

          <label className="cursor-pointer">
            <span className="text-white font-semibold text-lg">
              {isLoading ? 'Uploading...' : 'Drop your PDF here'}
            </span>
            <p className="text-slate-400 text-sm mt-2">or click to select</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleChange}
              disabled={isLoading}
              className="hidden"
            />
          </label>

          <p className="text-slate-500 text-xs mt-4">Supported format: PDF (up to 50MB)</p>
        </div>

        <div className="mt-8 p-4 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg">
          <h3 className="text-blue-300 font-semibold mb-2">How it works:</h3>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Upload a PDF document</li>
            <li>• The AI will analyze and index it</li>
            <li>• Ask questions about the content</li>
            <li>• Get instant, accurate answers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;