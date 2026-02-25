import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { ArrowButton } from './ui/arrow-button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false); // состояние
	const [appliedState, setAppliedState] = useState(defaultArticleState);

	const toggle = () => setIsOpen((prev) => !prev);

	const appliedStyles = {
		'--font-family': appliedState.fontFamilyOption.value,
		'--font-size': appliedState.fontSizeOption.value,
		'--font-color': appliedState.fontColor.value,
		'--container-width': appliedState.contentWidth.value,
		'--bg-color': appliedState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={appliedStyles}>
			{!isOpen && (
				<div className={styles.arrowButtonWrapper}>
					<ArrowButton isOpen={false} onClick={toggle} />
				</div>
			)}

			<ArticleParamsForm
				isOpen={isOpen}
				onClose={toggle}
				onApply={(values) => setAppliedState(values)}
				onReset={() => setAppliedState(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
