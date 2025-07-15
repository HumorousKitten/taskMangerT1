import type { FC } from 'react'

import Button  from '@mui/material/Button';

import clsx from 'clsx';


interface IButton {
	children: string
	className?: string
	StartIcon?: React.ElementType
	EndIcon?: React.ElementType
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const CustomButton: FC<IButton> = ({children, className, StartIcon, EndIcon, onClick}) => {
	const classes = clsx(className)

	return (
		<Button startIcon={StartIcon && <StartIcon />} endIcon={EndIcon && <EndIcon />} onClick={onClick} className={classes}>{children}</Button>
	);
}
