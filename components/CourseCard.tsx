import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  layout?: 'horizontal' | 'vertical';
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, layout = 'vertical' }) => {
  const navigate = useNavigate();

  if (layout === 'horizontal') {
    return (
      <div 
        onClick={() => navigate(`/courses/${course.id}`)}
        className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mr-4 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="relative h-32">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" /> {course.duration}
          </div>
        </div>
        <div className="p-4">
          <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-semibold mb-2">
            {course.category}
          </span>
          <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-1">{course.title}</h3>
          <p className="text-gray-500 text-xs line-clamp-1">{course.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => navigate(`/courses/${course.id}`)}
      className="flex bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4 cursor-pointer active:bg-gray-50 transition-colors"
    >
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 relative">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <PlayCircle className="text-white opacity-80" size={24} />
        </div>
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-center">
        <div className="flex space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                {course.category}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-medium">
                {course.duration}
            </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{course.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-1">{course.description}</p>
      </div>
    </div>
  );
};