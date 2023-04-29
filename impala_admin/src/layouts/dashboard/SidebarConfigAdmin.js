// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/',
  },
  {
    title: 'users',
    path: '/user',
    },
    {
      title: 'profile',
      path: '/profile',
      }
];

export default sidebarConfig;
