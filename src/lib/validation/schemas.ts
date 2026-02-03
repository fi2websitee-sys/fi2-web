import { z } from 'zod';

/**
 * Sanitize string to prevent XSS
 */
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
}

/**
 * Contact Form Validation Schema
 * Prevents XSS, injection attacks, and validates input
 */

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, 'Name can only contain letters and spaces')
    .transform((val) => sanitizeString(val)),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .transform((val) => val.toLowerCase().trim()),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters')
    .transform((val) => sanitizeString(val)),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .transform((val) => sanitizeString(val)),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Exam Upload Validation Schema
 * Validates file uploads and exam metadata
 */
export const examUploadSchema = z.object({
  courseName: z
    .string()
    .min(2, 'Course name must be at least 2 characters')
    .max(200, 'Course name must be less than 200 characters')
    .transform((val) => sanitizeString(val)),
  courseNameAr: z
    .string()
    .max(200, 'Arabic course name must be less than 200 characters')
    .transform((val) => sanitizeString(val))
    .optional()
    .nullable(),
  major: z.enum(['common', 'journalism', 'pr', 'marketing', 'info-management', 'data-science']),
  yearLevel: z.enum(['1', '2', '3', 'master1', 'master2']),
  semester: z.enum(['semester1', 'semester2']),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, 'Academic year must be in format YYYY-YYYY')
    .transform((val) => val.trim()),
  examType: z.enum(['midterm', 'final', 'quiz']),
});

export type ExamUploadInput = z.infer<typeof examUploadSchema>;

/**
 * File Upload Validation
 */
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => file.type === 'application/pdf',
      'Only PDF files are allowed'
    ),
});
