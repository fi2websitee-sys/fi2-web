export interface NavItem {
  label: string;
  labelAr?: string;
  href: string;
  children?: NavItem[];
  external?: boolean;
}

export interface Major {
  id: string;
  name: string;
  nameAr: string;
  level: 'bachelor' | 'master';
  description: string;
  descriptionAr?: string;
}

export interface President {
  id: string;
  name: string;
  nameAr: string;
  period: string;
  photo?: string;
  isCurrent?: boolean;
  contact?: {
    email?: string;
    phone?: string;
  };
}

export interface EntranceExam {
  id: string;
  academicYear: string;
  major: string;
  majorAr?: string;
  date?: string;
  pdfUrl: string;
}

export interface PreviousExam {
  id: string;
  courseName: string;
  courseNameAr?: string;
  major: 'journalism' | 'pr' | 'marketing' | 'info-management' | 'data-science' | 'common';
  yearLevel: 1 | 2 | 3 | 'master1' | 'master2';
  semester: 'fall' | 'spring';
  academicYear: string;
  examType: 'midterm' | 'final' | 'quiz';
  pdfUrl: string;
}

export interface ContractSheet {
  id: string;
  programName: string;
  programNameAr: string;
  level: 'bachelor' | 'master';
  major: string;
  pdfUrl: string;
}

export interface Rule {
  id: string;
  chapter: number;
  chapterTitle: string;
  chapterTitleAr?: string;
  articles: Article[];
}

export interface Article {
  number: number;
  title: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  image?: string;
  date: string;
  slug: string;
}

export interface ExamFilters {
  major: 'all' | 'journalism' | 'pr' | 'marketing' | 'info-management' | 'data-science' | 'common';
  yearLevel: 'all' | 1 | 2 | 3 | 'master1' | 'master2';
  semester: 'all' | 'fall' | 'spring';
  academicYear: 'all' | string;
  examType: 'all' | 'midterm' | 'final' | 'quiz';
}
