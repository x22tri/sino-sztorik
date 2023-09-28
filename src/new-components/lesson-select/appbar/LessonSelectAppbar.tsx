import {
  faArrowRightFromBracket,
  faBookOpen,
  faGraduationCap,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { TOP_NAV_ACCOUNT, TOP_NAV_LOGOUT } from '../../shared/strings'
import {
  AppbarMenuOption,
  AppbarSideNavConfig,
  AppbarWithMobileHamburger,
} from '../../shared/components/appbar/AppbarWithMobileHamburger'

const menuOptions: AppbarMenuOption[] = [
  {
    disabled: false,
    icon: faBookOpen,
    text: 'Tanulás',
  },
  {
    disabled: true,
    icon: faMagnifyingGlass,
    text: 'Keresés',
  },
  {
    disabled: true,
    icon: faUser,
    text: TOP_NAV_ACCOUNT,
  },
  {
    disabled: false,
    icon: faArrowRightFromBracket,
    text: TOP_NAV_LOGOUT,
  },
]

const sideNavConfig: AppbarSideNavConfig = { icon: faGraduationCap, text: 'Leckék' }

export function LessonSelectAppbar({ toggleDrawer }: { toggleDrawer: () => void }) {
  return <AppbarWithMobileHamburger {...{ menuOptions, sideNavConfig, toggleDrawer }} />
}
