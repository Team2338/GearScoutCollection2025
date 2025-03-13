import { ThemeProvider } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, Theme } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App.tsx';

const ORANGE = '#fe5000';
const ORANGE_HOVER = '#fe7755';
const OFFWHITE = '#faf9f6';
const customTheme: Theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& label.Mui-focused': {
						color: ORANGE
					}
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: OFFWHITE
				},
				root: {
					[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: ORANGE_HOVER
					},
					[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: ORANGE
					}
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: OFFWHITE
				}
			}
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={customTheme}>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
