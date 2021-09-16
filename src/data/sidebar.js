import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalculateIcon from '@mui/icons-material/Calculate';


export const portfolio = {
    title: 'Portfolio',
    icon: <BusinessCenterIcon />
}


export const menuList = [
    {
        title: 'Portfolio',
        icon: <BusinessCenterIcon />,
    },
    {
        title: 'Current Market',
        icon: <QueryStatsIcon />
    },
    {
        title: 'Calculators',
        icon: <CalculateIcon />,
        subMenu: [
            {
                title: 'Sell and Buy Back',
                path: '/calculators/hello'
            },
            {
                title: 'Dollar Cost Average',
                path: '/calculators/dca'
            }
    ]
    },
    {
        title: 'Profile',
        icon: <PersonIcon />
    },
    {
        title: 'Settings',
        icon: <SettingsIcon />
    }
]