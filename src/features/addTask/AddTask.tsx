import React, { FC } from 'react'

import { Stack, TextField } from '@mui/material'

import { CustomButton } from '@/shared/UI/button/Button'
import { PlusIcon } from '@/shared/icons/plusIcon/PlusIcon'

import { useTaskStore } from '@/store/useTasksStore'

import cl from './_addTask.module.css'

interface INewTask {
	setIsActive: (isActive: boolean) => void 
}

const NewTask: FC<INewTask> = ({setIsActive}) => {
	const [title, setTitle] = React.useState<string>('')
	const addTask = useTaskStore(state => state.addTask)

	function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.currentTarget.value)
	}

	function newTask() {
		if(!title) return
		addTask(title)
		setIsActive(false)
	}

	return (
		<Stack sx={{backgroundColor: '#000000', borderRadius: 3}}  alignItems='center' pt={1}>
			<TextField
				id='outlined-basic'
				label='Введите задачу'
				variant='outlined'
				type='text'
				required
				sx={{ backgroundColor: '#b1aeaeff', width: '90%', borderRadius: 3}}
				InputProps={{
					sx: {
						color: '#ffffff',
					},
				}}
				InputLabelProps={{
					sx: {
						color: '#ffffff',
						'&.Mui-focused': {
							color: '#ffffff',
						},
					},
				}}

				onChange={handleChangeValue}
			/>

			<CustomButton className={cl.addTaskBtnColor} onClick={() => newTask()}>Добавить</CustomButton>
		</Stack>
	)
}

export const AddTask = () => {
	const [isActive, setIsActive] = React.useState<boolean>(false)



	return !isActive ? (
		<CustomButton StartIcon={PlusIcon} onClick={() => setIsActive(true)}>
			Добавить задачу
		</CustomButton>
	) : (
		<NewTask setIsActive = {setIsActive}/>
	)
}
