import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Book, Calendar, Clock, FileText, LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { calculateTimeToDeadline, formatIndonesianDate } from '@/lib/date-utils';
import Link from 'next/link';
import TaskActionButton from './task-action-button';

import { AssignmentWithStatus } from '@/types/assignment';

interface AssignmentSheetProps {
  assignment: AssignmentWithStatus;
  handleSubmitTask: () => Promise<void>;
  handleUndoTask: () => Promise<void>;
  loading: boolean;
}

export default function AssignmentSheet({
  assignment,
  handleSubmitTask,
  handleUndoTask,
  loading
}: AssignmentSheetProps) {
  const { title, description, type, isCompleted, deadline, link, courseName } = assignment;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='sm' variant='link' className='p-0'>
          <FileText size={16} strokeWidth={3} />
          <p className='text-sm'>Lihat detail</p>
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='mb-3 flex flex-wrap gap-2 items-center'>
            <Book size={20} strokeWidth={3} />
            <span>{courseName || 'Mata Kuliah'}</span>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className='flex flex-col gap-6'>
          <div className='pt-6'>
            <h3 className='text-xl font-medium'>{title}</h3>
            <p className='text-sm mt-3 text-neutral-600 text-justify'>{description}</p>
          </div>
          <div className='flex gap-2'>
            <Badge variant='taskType' className='w-fit capitalize'>
              {type}
            </Badge>
            <Badge variant={isCompleted ? 'statusDone' : 'statusTodo'} className='w-fit'>
              {isCompleted ? 'Sudah Dikerjakan' : 'Belum Dikerjakan'}
            </Badge>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Calendar size={16} strokeWidth={3} className='text-neutral-600' />
              <p className='text-sm text-neutral-600'>{formatIndonesianDate(deadline)}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <Clock size={16} strokeWidth={3} className='text-neutral-600' />
              <p className='text-sm text-neutral-600'>{calculateTimeToDeadline(deadline)}</p>
            </div>
          </div>
          {link && (
            <div className='flex flex-col bg-neutral-100 p-5 rounded-md gap-2'>
              <div className='flex gap-2 items-center'>
                <LinkIcon size={16} strokeWidth={3} />
                <p className='text-sm font-medium'>Link Tugas</p>
              </div>
              <Link
                className='text-sm text-blue-600 hover:underline break-words'
                href={link}
                target='_blank'
                rel='noreferrer noopener'
              >
                {link}
              </Link>
            </div>
          )}
          <TaskActionButton
            isCompleted={isCompleted}
            handleSubmitTask={handleSubmitTask}
            handleUndoTask={handleUndoTask}
            isFullWidth
            loading={loading}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
