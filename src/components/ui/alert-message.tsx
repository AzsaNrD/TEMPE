import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AlertMessageProps {
  title: string;
  description: string;
  variant: 'default' | 'destructive';
  className?: string;
}

export default function AlertMessage({ title, description, variant, className }: AlertMessageProps) {
  return (
    <Alert variant={variant} className={className}>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
