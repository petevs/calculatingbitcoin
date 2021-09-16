import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalculateIcon from '@mui/icons-material/Calculate';
import ListAltIcon from '@mui/icons-material/ListAlt';


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
            },
            {
                title: 'Buy The Dip',
                path: ''
            },
            {
                title: 'DCA vs Buy The Dip',
                path: '/calculators/dca'
            },
            {
                title: 'Retire on Bitcoin',
                path: ''
            },
            {
                title: 'Speculative Attack',
                path: ''
            },
            {
                title: 'Opportunity Cost',
                path: ''
            },
            {
                title: 'Scenario Planning',
                path: ''
            },
            {
                title: 'Tax Liability',
                path: ''
            },
    ]
    },
    {
        title: 'Resources',
        icon: <ListAltIcon />,
        subMenu: [
            {
                title: 'Articles',
                path: ''
            },
            {
                title: 'People to Follow',
                path: ''
            },
            {
                title: 'Cool Companies',
                path: ''
            },
            {
                title: 'Hardware Wallets',
                path: ''
            },

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