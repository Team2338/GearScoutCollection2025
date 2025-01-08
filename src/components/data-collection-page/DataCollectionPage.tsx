import './DataCollectionPage.scss';
import { IUser } from '../../model/Models.ts';

interface IProps {
	user: IUser;
}

export default function DataCollectionPage(props: IProps) {
	return (
		<main className="page data-page">Data collection page</main>
	);
};
