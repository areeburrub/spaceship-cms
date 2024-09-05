'use client'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, type InputProps } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface PasswordInputProps extends InputProps {
    showStrengthSlider?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, showStrengthSlider = true, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const [strength, setStrength] = React.useState(0)

        const disabled = props.value === '' || props.value === undefined || props.disabled

        const checkPasswordStrength = (password: string): number => {
            let strength = 0
            if (password.length >= 8) strength += 1
            if (/[A-Z]/.test(password)) strength += 1
            if (/[a-z]/.test(password)) strength += 1
            if (/[0-9]/.test(password)) strength += 1
            if (/[^A-Za-z0-9]/.test(password)) strength += 1
            return strength
        }

        const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newPassword = event.target.value
            if (showStrengthSlider) {
                setStrength(checkPasswordStrength(newPassword))
            }
            props.onChange && props.onChange(event)
        }

        const getSliderColor = (strength: number) => {
            switch (strength) {
                case 1:
                    return 'bg-red-500'
                case 2:
                    return 'bg-orange-500'
                case 3:
                    return 'bg-yellow-500'
                case 4:
                    return 'bg-green-500'
                case 5:
                    return 'bg-green-700'
                default:
                    return 'bg-gray-300'
            }
        }

        return (
            <>
            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={cn('hide-password-toggle pr-10', className)}
                    ref={ref}
                    {...props}
                    onChange={handlePasswordChange}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={disabled}
                >
                    {showPassword && !disabled ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                </Button>
            </div>

                {/*{showStrengthSlider && (*/}
                {/*    <>*/}
                {/*        <div className="mt-2">*/}
                {/*            <Slider*/}
                {/*                value={[strength]}*/}
                {/*                max={5}*/}
                {/*                disabled*/}
                {/*                className={`h-2 ${getSliderColor(strength)}`}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        /!*<div className="text-sm mt-2">*!/*/}
                {/*        /!*    Password Strength: <strong>{strength}/5</strong>*!/*/}
                {/*        /!*</div>*!/*/}
                {/*    </>*/}
                {/*)}*/}

                <style>{`
                        .hide-password-toggle::-ms-reveal,
                        .hide-password-toggle::-ms-clear {
                            visibility: hidden;
                            pointer-events: none;
                            display: none;
                        }
                    `}</style>
            </>
        )
    }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
