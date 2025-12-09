'use client';

import { ExamFilters } from '@/types';
import { cn } from '@/lib/utils';

interface ExamFilterProps {
  filters: ExamFilters;
  onFilterChange: (filters: ExamFilters) => void;
  availableYears: string[];
}

export default function ExamFilter({
  filters,
  onFilterChange,
  availableYears,
}: ExamFilterProps) {
  const handleChange = (key: keyof ExamFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const selectClass =
    'w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-heading font-bold text-primary mb-4">
        Filter Exams
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Major Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major
          </label>
          <select
            value={filters.major}
            onChange={(e) => handleChange('major', e.target.value)}
            className={selectClass}
          >
            <option value="all">All Majors</option>
            <option value="common">Common Courses</option>
            <option value="journalism">Journalism</option>
            <option value="pr">Public Relations</option>
            <option value="marketing">Marketing & Advertising</option>
            <option value="info-management">Information Management</option>
            <option value="data-science">Data Science</option>
          </select>
        </div>

        {/* Year Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Level
          </label>
          <select
            value={filters.yearLevel}
            onChange={(e) => handleChange('yearLevel', e.target.value)}
            className={selectClass}
          >
            <option value="all">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="master1">Master 1</option>
            <option value="master2">Master 2</option>
          </select>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Semester
          </label>
          <select
            value={filters.semester}
            onChange={(e) => handleChange('semester', e.target.value)}
            className={selectClass}
          >
            <option value="all">All Semesters</option>
            <option value="semester1">Semester 1</option>
            <option value="semester2">Semester 2</option>
          </select>
        </div>

        {/* Academic Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year
          </label>
          <select
            value={filters.academicYear}
            onChange={(e) => handleChange('academicYear', e.target.value)}
            className={selectClass}
          >
            <option value="all">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Type
          </label>
          <select
            value={filters.examType}
            onChange={(e) => handleChange('examType', e.target.value)}
            className={selectClass}
          >
            <option value="all">All Types</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          onFilterChange({
            major: 'all',
            yearLevel: 'all',
            semester: 'all',
            academicYear: 'all',
            examType: 'all',
          })
        }
        className="mt-4 text-sm text-primary hover:text-primary-dark font-medium transition-smooth"
      >
        Reset Filters
      </button>
    </div>
  );
}
