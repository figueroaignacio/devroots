// Components
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="border-destructive rounded-lg py-2">
      <div className="flex gap-2 items-center">
        <ExclamationTriangleIcon />
        <AlertTitle>Error</AlertTitle>
      </div>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
