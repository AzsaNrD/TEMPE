import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CalendarClockIcon } from 'lucide-react';

interface DateTimePickerProps {
  name: string;
}

export function DateTimePicker({ name }: DateTimePickerProps) {
  const { setValue, getValues, clearErrors } = useFormContext();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setValue(name, date.toISOString());
      clearErrors(name);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: number) => {
    const currentDate = new Date(getValues(name) || new Date());
    const newDate = new Date(currentDate);

    if (type === 'hour') {
      newDate.setHours(value);
    } else {
      newDate.setMinutes(value);
    }

    setValue(name, newDate.toISOString());
    clearErrors(name);
  };

  const selectedDate = getValues(name) ? new Date(getValues(name)) : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-full justify-start'>
          <CalendarClockIcon size={16} />
          {selectedDate ? format(selectedDate, 'MM/dd/yyyy HH:mm') : 'Pilih Tanggal & Waktu'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar
            mode='single'
            selected={selectedDate || undefined}
            onSelect={handleDateSelect}
            initialFocus={!selectedDate}
          />
          <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={selectedDate?.getHours() === hour ? 'default' : 'ghost'}
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('hour', hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size='icon'
                    variant={selectedDate?.getMinutes() === minute ? 'default' : 'ghost'}
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('minute', minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
