import { AppbarWrapper, ThemeChangeButton, Logo } from './AppbarWrapper'
import './appbars.css';

const MainPageAppbar = ({themeToggle}) => {
    return (
        <AppbarWrapper>
            <Logo />
            <ThemeChangeButton {...{themeToggle}} />
        </AppbarWrapper>
    )
}

export default MainPageAppbar