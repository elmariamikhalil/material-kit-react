import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Projects',
    path: '/user',
    icon: icon('ic-project'),
  },
  {
    title: 'Clients',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Users',
    path: '/blog',
    icon: icon('ic-user'),
  },
  {
    title: 'Teams',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Reports',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
