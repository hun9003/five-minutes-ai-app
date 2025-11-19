import React, { useState } from 'react';
import { Category, Course } from '../types';
import { COURSES } from '../constants';
import { CourseCard } from '../components/CourseCard';

export const CourseList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>(Category.ALL);

  const filteredCourses = activeFilter === Category.ALL
    ? COURSES
    : COURSES.filter(c => c.category === activeFilter);

  const filters = Object.values(Category);

  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">강의실</h1>
        <div className="flex space-x-2 overflow-x-auto no-scrollbar">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6">
        {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
            ))
        ) : (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">해당하는 강의가 없습니다.</p>
            </div>
        )}
      </div>
    </div>
  );
};