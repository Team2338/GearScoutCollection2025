import './LoginPage.scss';
import React from 'react';
import { IUser } from '../../model/Models.ts';

interface IProps {
	handleLogin: (user: IUser) => void;
}

export const LoginPage = (props: IProps) => {
	return (
		<div>Login page</div>
	);
};
