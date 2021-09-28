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
        path: '/portfolio'
    },
    {
        title: 'Current Market',
        icon: <QueryStatsIcon />,
        path: '/current-market'
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
                path: '/calculators/buy-the-dip'
            },
            {
                title: 'DCA vs Buy The Dip',
                path: '/calculators/dca'
            },
            {
                title: 'Retire on Bitcoin',
                path: '/calculators/retire'
            },
            {
                title: 'Speculative Attack',
                path: '/calculators/speculative-attack'
            },
            {
                title: 'Opportunity Cost',
                path: '/calculators/opportunity-cost'
            },
            {
                title: 'Scenario Planning',
                path: '/calculators/scenario-planning'
            },
            {
                title: 'Tax Liability',
                path: '/calculators/tax-liability'
            },
    ]
    },
    {
        title: 'Resources',
        icon: <ListAltIcon />,
        subMenu: [
            {
                title: 'Articles',
                path: '/resources/articles'
            },
            {
                title: 'People to Follow',
                path: '/resources/people-to-follow'
            },
            {
                title: 'Cool Companies',
                path: '/resources/cool-companies'
            },
            {
                title: 'Hardware Wallets',
                path: '/resources/hardware-wallets'
            },

    ]
    },
    {
        title: 'Profile',
        icon: <PersonIcon />,
        path: '/profile'
    },
    {
        title: 'Settings',
        icon: <SettingsIcon />,
        path: '/settings'
    }
]