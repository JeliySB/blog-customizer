import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { ArrowButton } from './ui/arrow-button';

export const App = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false); // состояние
	const [appliedState, setAppliedState] = useState(defaultArticleState);

	const toggle = () => setIsMenuOpen((prev) => !prev);

	const appliedStyles = {
		'--font-family': appliedState.fontFamilyOption.value,
		'--font-size': appliedState.fontSizeOption.value,
		'--font-color': appliedState.fontColor.value,
		'--container-width': appliedState.contentWidth.value,
		'--bg-color': appliedState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={appliedStyles}>
			{!isMenuOpen && (
				<div className={styles.arrowButtonWrapper}>
					<ArrowButton isOpen={false} onClick={toggle} />
				</div>
			)}

			<ArticleParamsForm
				isOpen={isMenuOpen}
				onClose={toggle}
				onApply={(values) => setAppliedState(values)}
			/>
			<Article />
		</main>
	);
};
