import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Props {
    laravelError?: LaravelError;
    children?: React.ReactNode;
}

export interface LaravelError {
    errors: Error[];
}

export interface Error {
    code: string;
    status: string;
    detail: string;
}

export const GeneralError = ({ children }: { children: React.ReactNode }) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>An error has been ocurred</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
        </Alert>
    );
};

const Error = ({ laravelError, children }: Props) => {
    if (laravelError && laravelError.errors && laravelError.errors.length !== 0) {
        return (
            <GeneralError>
                <ul>
                    {laravelError.errors.map((error, index) => (
                        <li key={index}>{error.detail}</li>
                    ))}
                </ul>
            </GeneralError>
        );
    }

    if (children) {
        return <GeneralError>{children}</GeneralError>;
    }

    return <></>;
};

export default Error;
