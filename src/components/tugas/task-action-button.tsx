'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TaskActionButtonProps {
  isCompleted: boolean | undefined;
  handleSubmitTask: () => Promise<void>;
  handleUndoTask: () => Promise<void>;
  isFullWidth?: boolean;
  loading?: boolean;
}

export default function TaskActionButton({
  isCompleted,
  handleSubmitTask,
  handleUndoTask,
  isFullWidth,
  loading,
}: TaskActionButtonProps) {
  const { toast } = useToast();

  if (isCompleted == null) {
    return (
      <Button
        size='sm'
        onClick={() =>
          toast({
            title: 'Gagal',
            description: 'Anda harus masuk terlebih dahulu!',
            variant: 'destructive',
          })
        }
        className={isFullWidth ? 'w-full' : ''}
        disabled={loading}
      >
        Tandai Selesai
      </Button>
    );
  }

  return isCompleted ? (
    <Button
      size='sm'
      variant='outline'
      onClick={handleUndoTask}
      className={isFullWidth ? 'w-full' : ''}
      disabled={loading}
    >
      Batalkan Selesai
    </Button>
  ) : (
    <Button size='sm' onClick={handleSubmitTask} className={isFullWidth ? 'w-full' : ''} disabled={loading}>
      Tandai Selesai
    </Button>
  );
}
