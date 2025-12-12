'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import ExamFilter from '@/components/ui/ExamFilter';
import ExamTable from '@/components/ui/ExamTable';
import { previousExams } from '@/data/previousExams';
import { ExamFilters } from '@/types';

export default function PreviousExamsPage() {
  const [filters, setFilters] = useState<ExamFilters>({
    major: 'all',
    yearLevel: 'all',
    semester: 'all',
    academicYear: 'all',
    examType: 'all',
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Get unique academic years for filter
  const availableYears = useMemo(() => {
    const years = new Set(previousExams.map((exam) => exam.academicYear));
    return Array.from(years).sort().reverse();
  }, []);

  // Filter exams based on all criteria
  const filteredExams = useMemo(() => {
    return previousExams.filter((exam) => {
      // Major filter
      if (filters.major !== 'all' && exam.major !== filters.major) {
        return false;
      }

      // Year level filter
      if (
        filters.yearLevel !== 'all' &&
        exam.yearLevel.toString() !== filters.yearLevel
      ) {
        return false;
      }

      // Semester filter
      if (filters.semester !== 'all' && exam.semester !== filters.semester) {
        return false;
      }

      // Academic year filter
      if (
        filters.academicYear !== 'all' &&
        exam.academicYear !== filters.academicYear
      ) {
        return false;
      }

      // Exam type filter
      if (filters.examType !== 'all' && exam.examType !== filters.examType) {
        return false;
      }

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCourseName = exam.courseName.toLowerCase().includes(query);
        const matchesCourseNameAr = exam.courseNameAr?.toLowerCase().includes(query);
        return matchesCourseName || matchesCourseNameAr;
      }

      return true;
    });
  }, [filters, searchQuery]);

  return (
    <>
      <HeroBanner
        title="PREVIOUS EXAMS"
        titleAr="الامتحانات سابقة"
        subtitle="Browse and download previous exams"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by course name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            />
          </div>
        </div>

        {/* Filters */}
        <ExamFilter
          filters={filters}
          onFilterChange={setFilters}
          availableYears={availableYears}
        />

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-primary">{filteredExams.length}</span>{' '}
            {filteredExams.length === 1 ? 'exam' : 'exams'}
          </p>
        </div>

        {/* Exam Table */}
        <ExamTable exams={filteredExams} />
      </div>
    </>
  );
}
