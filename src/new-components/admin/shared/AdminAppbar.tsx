import LogoTitle from '../../shared/components/LogoTitle'
import { IconButtonWithText } from '../../shared/components/appbar/IconButtonWithText'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { TOP_NAV_LOGOUT } from '../../shared/strings'
import { AppbarBase } from '../../shared/components/appbar/AppbarBase'
import IconButtonWithTooltip from '../../shared/components/IconButtonWithTooltip'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { If, Then, Else } from 'react-if'

export function AdminAppbar() {
  const isSmallScreen = useSmallScreen()

  return (
    <AppbarBase>
      <LogoTitle />

      <If condition={isSmallScreen}>
        <Then>
          <IconButtonWithTooltip icon={faArrowRightFromBracket} onClick={() => {}} tooltip={TOP_NAV_LOGOUT} />
        </Then>

        <Else>
          <IconButtonWithText icon={faArrowRightFromBracket} text={TOP_NAV_LOGOUT} />
        </Else>
      </If>
    </AppbarBase>
  )
}
