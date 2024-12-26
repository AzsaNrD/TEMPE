'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Book, Calendar } from 'lucide-react';
import { formatIndonesianDate } from '@/lib/date-utils';
import { AssignmentWithStatus } from '@/types/assignment';
import DropdownTugas from '@/components/tugas/dropdown-tugas';
import { Course } from '@/types/course';
import { createAssignmentStatus, deleteAssignmentStatus } from '@/actions/assignment-status';
import { useToast } from '@/hooks/use-toast';
import AssignmentSheet from './assignment-sheet';
import TaskActionButton from './task-action-button';

interface AssignmentCardProps {
  assignment: AssignmentWithStatus;
  courses: Course[];
  isLoggedIn: boolean;
}

export function AssignmentCard({ assignment, courses, isLoggedIn }: AssignmentCardProps) {
  const { toast } = useToast();

  const handleSubmitTask = async () => {
    if (!assignment.id || !assignment.courseId) {
      return;
    }

    const response = await createAssignmentStatus({
      assignmentId: assignment.id,
      courseId: assignment.courseId,
      isCompleted: true,
    });

    if (response.success) {
      toast({
        title: 'Tugas Ditandai Selesai',
        description: `Tugas "${assignment.title}" telah ditandai selesai.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description:
          response.message || `Gagal menandai tugas "${assignment.title}" sebagai selesai.`,
      });
    }
  };

  const handleUndoTask = async () => {
    if (!assignment.id) {
      return;
    }

    const response = await deleteAssignmentStatus(assignment.id);

    if (response.success) {
      toast({
        title: 'Tugas Ditandai Belum Selesai',
        description: `Tugas "${assignment.title}" telah dibatalkan selesai.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: response.message || `Gagal membatalkan tugas "${assignment.title}" selesai.`,
      });
    }
  };

  return (
    <div className='bg-white md:shadow rounded-md border border-neutral-200 h-fit'>
      <div className='p-6 relative flex flex-col'>
        <h2 className='text-xl font-medium'>{assignment.title}</h2>
        <div className='flex gap-2 items-center mt-2'>
          <Book className='text-neutral-600' size={16} strokeWidth={3} />
          <p className='text-neutral-600 text-sm'>{assignment.courseName || 'Mata Kuliah'}</p>
        </div>
        {isLoggedIn && <DropdownTugas assignment={assignment} courses={courses} />}
      </div>
      <Separator />
      <div className='p-6 flex flex-col gap-5'>
        <p className='text-sm text-neutral-600 line-clamp-2'>{assignment.description}</p>
        <div className='flex gap-2'>
          <Badge variant='taskType' className='w-fit capitalize'>
            {assignment.type}
          </Badge>
          <Badge variant={assignment.isCompleted ? 'statusDone' : 'statusTodo'} className='w-fit'>
            {assignment.isCompleted ? 'Sudah Dikerjakan' : 'Belum Dikerjakan'}
          </Badge>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <Calendar size={16} strokeWidth={3} className='text-neutral-600' />
            <p className='text-sm text-neutral-600'>Tenggat waktu:</p>
          </div>
          <p className='text-sm font-medium text-neutral-950'>
            {formatIndonesianDate(assignment.deadline)}
          </p>
        </div>
      </div>
      <Separator />
      <div className='px-6 py-3 flex justify-between items-center'>
        <AssignmentSheet
          assignment={assignment}
          handleSubmitTask={handleSubmitTask}
          handleUndoTask={handleUndoTask}
        />
        <TaskActionButton
          isCompleted={assignment.isCompleted}
          handleSubmitTask={handleSubmitTask}
          handleUndoTask={handleUndoTask}
        />
      </div>
    </div>
  );
}
