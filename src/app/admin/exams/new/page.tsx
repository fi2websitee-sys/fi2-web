'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { examUploadSchema, fileUploadSchema } from '@/lib/validation/schemas';
import { logger } from '@/lib/utils/logger';

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

export default function NewExamPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    courseName: '',
    courseNameAr: '',
    major: 'common',
    yearLevel: '1',
    semester: 'semester1',
    academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    examType: 'final',
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file using schema
      const fileValidation = fileUploadSchema.safeParse({ file: selectedFile });
      
      if (!fileValidation.success) {
        const errorMessage = fileValidation.error.errors[0]?.message || 'Invalid file';
        setError(errorMessage);
        setFile(null);
        return;
      }

      // Additional security: Check file extension matches MIME type
      const fileName = selectedFile.name.toLowerCase();
      if (!fileName.endsWith('.pdf')) {
        setError('File must have .pdf extension');
        setFile(null);
        return;
      }

      // Check for suspicious file names
      if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
        setError('Invalid file name');
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Validate form data
      const formValidation = examUploadSchema.safeParse({
        courseName: formData.courseName,
        courseNameAr: formData.courseNameAr || null,
        major: formData.major,
        yearLevel: formData.yearLevel,
        semester: formData.semester,
        academicYear: formData.academicYear,
        examType: formData.examType,
      });

      if (!formValidation.success) {
        const errorMessage = formValidation.error.errors[0]?.message || 'Invalid form data';
        setError(errorMessage);
        setUploading(false);
        return;
      }

      // Use validated (and transformed) data
      const validatedData = formValidation.data;

      // Create unique filename with sanitization
      const timestamp = Date.now();
      const sanitizedCourseName = validatedData.courseName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50); // Limit length
      const sanitizedAcademicYear = validatedData.academicYear.replace(/[^0-9-]/g, '');
      const sanitizedExamType = validatedData.examType.replace(/[^a-z]/g, '');
      
      const fileName = `${sanitizedAcademicYear}-${sanitizedCourseName}-${sanitizedExamType}-${timestamp}.pdf`;
      const filePath = `exams/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save to database using validated data
      const { error: dbError } = await supabase
        .from('previous_exams')
        .insert({
          course_name: validatedData.courseName,
          course_name_ar: validatedData.courseNameAr || null,
          major: validatedData.major,
          year_level: validatedData.yearLevel,
          semester: validatedData.semester,
          academic_year: validatedData.academicYear,
          exam_type: validatedData.examType,
          pdf_url: publicUrl,
          file_size: file.size,
        });

      if (dbError) {
        // Clean up uploaded file if database insert fails
        await supabase.storage.from('documents').remove([filePath]);
        throw dbError;
      }

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/exams');
        router.refresh();
      }, 2000);

    } catch (err) {
      logger.error('Exam upload error', {
        error: err instanceof Error ? err.message : 'Unknown error',
        // Don't log file details or user info
      });
      setError('Failed to upload exam. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-12 border border-green-200 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
            <p className="text-gray-600 mb-6">
              The exam has been uploaded and is now available to students.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to exams list...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/exams"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exams</span>
        </Link>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Upload Exam PDF
        </h1>
        <p className="text-gray-600">
          Add a new exam for students to download
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Course Name */}
          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2">
              Course Name (English) *
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Introduction to Communication"
            />
          </div>

          {/* Course Name Arabic */}
          <div>
            <label htmlFor="courseNameAr" className="block text-sm font-medium text-gray-700 mb-2">
              Course Name (Arabic)
            </label>
            <input
              type="text"
              id="courseNameAr"
              name="courseNameAr"
              value={formData.courseNameAr}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-arabic"
              placeholder="مدخل إلى الإعلام"
              dir="rtl"
            />
          </div>

          {/* Major */}
          <div>
            <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
              Major *
            </label>
            <select
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="common">Common Courses</option>
              <option value="journalism">Journalism</option>
              <option value="pr">Public Relations</option>
              <option value="marketing">Marketing & Advertising</option>
              <option value="info-management">Information Management</option>
              <option value="data-science">Data Science</option>
            </select>
          </div>

          {/* Year Level and Semester */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Year Level *
              </label>
              <select
                id="yearLevel"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="master1">Master 1</option>
                <option value="master2">Master 2</option>
              </select>
            </div>

            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                Semester *
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="semester1">Semester 1</option>
                <option value="semester2">Semester 2</option>
              </select>
            </div>
          </div>

          {/* Academic Year and Exam Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <input
                type="text"
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="2023-2024"
              />
            </div>

            <div>
              <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-2">
                Exam Type *
              </label>
              <select
                id="examType"
                name="examType"
                value={formData.examType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              PDF File *
            </label>
            <div className="relative">
              <input
                type="file"
                id="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
            {file && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Maximum file size: 10MB
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Exam</span>
                </>
              )}
            </button>

            <Link
              href="/admin/exams"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
