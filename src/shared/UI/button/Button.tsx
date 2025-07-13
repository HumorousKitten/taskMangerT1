import Button  from '@mui/material/Button';
import clsx from 'clsx';
import type { FC } from 'react'


interface IButton {
	children: string
	className?: string
	StartIcon?: React.ElementType
	EndIcon?: React.ElementType
}

export const CustomButton: FC<IButton> = ({children, className, StartIcon, EndIcon}) => {
	const classes = clsx(className)

	return (
		<Button startIcon={StartIcon && <StartIcon />} endIcon={EndIcon && <EndIcon />}>{children}</Button>
	);
}
