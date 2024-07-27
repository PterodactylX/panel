import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Props {
	laravelError?: LaravelError;
}

export interface LaravelError {
    errors: Error[];
}

export interface Error {
    code: string;
    status: string;
    detail: string;
}

const Error: React.FC<Props> = ({ laravelError }) => {
	if (!laravelError) {
		return null;
	}

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>An error has been ocurred</AlertTitle>
            <AlertDescription>
				<ul>
					{laravelError.errors.map((error, index) => (
						<li key={index}>{error.detail}</li>
					))}	
				</ul>
			</AlertDescription>
        </Alert>
    );
};

export default Error;
