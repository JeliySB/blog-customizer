import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import { useRef, useEffect, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import clsx from 'clsx';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onClose: () => void;
	onApply: (values: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	onApply,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLElement>(null);

	const [formValues, setFormValues] =
		useState<ArticleStateType>(defaultArticleState);

	// закрытие
	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onClose]);

	const handleReset = () => {
		setFormValues(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleApply = () => {
		onApply(formValues);
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<div className={styles.header}>
					<ArrowButton isOpen={true} onClick={onClose} />
				</div>

				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					{/* Заголовок */}

					<Text as='h2' size={31} weight={800} uppercase>
						Задать параметры
					</Text>

					{/* Шрифт */}
					<Select
						title='ШРИФТ'
						selected={formValues.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormValues((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					{/* размер шрифта */}
					<RadioGroup
						name='font-size'
						title='РАЗМЕР ШРИФТА'
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						onChange={(option) =>
							setFormValues((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					{/* цвет шрифта */}
					<Select
						title='ЦВЕТ ШРИФТА'
						selected={formValues.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormValues((prev) => ({ ...prev, fontColor: option }))
						}
					/>

					<Separator />

					{/* цвет фона */}
					<Select
						title='ЦВЕТ ФОНА'
						selected={formValues.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormValues((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					{/* ширина контента */}
					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={formValues.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormValues((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					{/* кнопки */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
