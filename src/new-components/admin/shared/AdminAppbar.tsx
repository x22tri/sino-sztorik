import LogoTitle from '../../shared/components/LogoTitle'
import { AppbarButton } from '../../shared/components/appbar/AppbarButton'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { TOP_NAV_LOGOUT } from '../../shared/strings'
import { AppbarBase } from '../../shared/components/appbar/AppbarWithMobileHamburger'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { If, Then, Else } from 'react-if'

export function AdminAppbar() {
  const isSmallScreen = useSmallScreen()

  return (
    <AppbarBase>
      <LogoTitle />

      <If condition={isSmallScreen}>
        <Then>
          <ToolbarButton icon={faArrowRightFromBracket} onClick={() => {}} tooltip={TOP_NAV_LOGOUT} />
        </Then>

        <Else>
          <AppbarButton icon={faArrowRightFromBracket} text={TOP_NAV_LOGOUT} />
        </Else>
      </If>
    </AppbarBase>
  )
}
