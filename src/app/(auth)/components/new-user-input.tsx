'use client'

import * as React from 'react';
import {CheckCircleIcon, XCircleIcon} from 'lucide-react';
import {Input, type InputProps} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {isUsernameAvailable} from "@/_actions/auth";


const NewUsernameInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, ...props}, ref) => {
        const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
        const [loading, setLoading] = React.useState(false);

        // Debounce function to delay the username availability check
        React.useEffect(() => {
            const handler = setTimeout(async () => {
                if (props.value) {
                    setLoading(true);
                    try {
                        const [available, error] = await isUsernameAvailable({username:String(props.value)});
                        setIsAvailable(available);
                    } catch (error) {
                        setIsAvailable(false);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setIsAvailable(null);
                }
            }, 1000);
            return () => clearTimeout(handler);
        }, [props.value]);

        return (
            <div className="relative">
                <Input
                    type="text"
                    className={cn('pr-10', className)}
                    ref={ref}
                    {...props}
                />
                {!loading && isAvailable !== null && (
                    <span className="absolute right-3 top-2">
                        {isAvailable ? (
                            <CheckCircleIcon className="text-green-500" aria-hidden="true"/>
                        ) : (
                            <XCircleIcon className="text-red-500" aria-hidden="true"/>
                        )}
                    </span>
                )}
                {loading && (
                    <span className="absolute right-3 top-2 animate-spin">
                        {/* Add a spinner or loading icon here */}
                        <svg
                            className="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v1m6.364 1.636l-.707.707M20 12h-1m-1.636 6.364l-.707-.707M12 20v-1m-6.364-1.636l-.707.707M4 12H3m1.636-6.364l-.707-.707M12 4l0 1"
                            />
                        </svg>
                    </span>
                )}
            </div>
        );
    }
);

NewUsernameInput.displayName = 'NewUsernameInput';

export {NewUsernameInput};
