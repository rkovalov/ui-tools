import type { Story } from '@storybook/react/types-6-0';
import { NavLink, BrowserRouter } from 'react-router-dom';
import type { Props } from './SideBar';
import { createStoryMeta } from '../../utils/stories';
import { color } from '../../styles/colors';

import SideBar from './';

import Icon from '../Icon';

const LogoSmSrc =
  // eslint-disable-next-line max-len
  'https://free-png.ru/wp-content/uploads/2020/11/b64cc812d68e951149b3e1a21c9a49e7-35dd74d8.png';

const LogoSrc =
  // eslint-disable-next-line max-len
  'https://free-png.ru/wp-content/uploads/2020/11/b64cc812d68e951149b3e1a21c9a49e7-35dd74d8.png';

export default createStoryMeta({
  title: 'SideBar',
  component: SideBar,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: color('gray', 10) }],
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
});

const Template: Story<Props> = args => {
  return (
    <BrowserRouter>
      <SideBar {...args}>
        <SideBar.Header>
          <SideBar.MenuItem style={{ marginBottom: 30 }}>
            {({ isCollapsed }) => (
              <SideBar.MenuLink href="#main" isCollapsed={isCollapsed} withoutHover title="home">
                {isCollapsed ? (
                  <img src={LogoSmSrc} alt="logo" />
                ) : (
                  <img src={LogoSrc} alt="logo" style={{ maxWidth: 70, width: 70 }} />
                )}
              </SideBar.MenuLink>
            )}
          </SideBar.MenuItem>
          <SideBar.UserMenuItem title="FirstName LastName" firstName="FirstName" lastName="LastName" href="#">
            FirstName LastName
          </SideBar.UserMenuItem>
          <SideBar.MenuItem title="Notification" icon="bell" href="#">
            Notification
          </SideBar.MenuItem>
        </SideBar.Header>
        <SideBar.Content>
          <SideBar.MenuItem linkTo="/dashboard" title="Dashboard" icon="dashboard" linkComponent={NavLink as NavLink}>
            Dashboard
          </SideBar.MenuItem>
          <SideBar.MenuItem
            title="Transaction"
            icon="transactions"
            linkComponent={NavLink as NavLink}
            linkTo="/transaction"
          >
            Transaction
          </SideBar.MenuItem>
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.MenuItem
            title="Payments"
            icon={({ isActive, isHovered }) => (
              <Icon
                name="payments"
                color={isHovered ? '#638ECF' : isActive ? '#638ECF' : '#6d849b'}
                size={20}
                style={{ fontSize: 14 }}
              />
            )}
          >
            Payments
          </SideBar.MenuItem>
          <SideBar.MenuItem title="Settings" icon="settings">
            Settings
          </SideBar.MenuItem>
          <SideBar.MenuItem title="All apps" icon="apps">
            All apps
          </SideBar.MenuItem>
        </SideBar.Footer>
      </SideBar>
    </BrowserRouter>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  className: 'any',
};
