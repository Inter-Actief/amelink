// Main menu structure used by Header and computed by PageView

type MenuItem = {
    labelKey: string
    icon?: string
    route?: string
    url?: string
    items?: MenuItem[]
}

export const mainMenu: MenuItem[] = [
    {
        labelKey: 'Home',
        icon: 'home',
        route: '/',
    },
    {
        labelKey: 'Activities',
        route: '/activities',
    },
    {
        labelKey: 'News',
        route: '/News',
    },
    {
        labelKey: 'Publications',
        route: '/publications',
    },
    {
        labelKey: 'Companies',
        route: '/companies',
    },
    {
        labelKey: 'Videos',
        route: '/videos',
    },
    {
        labelKey: 'Association',
        items: [
            { labelKey: 'Inter-Actief', route: '/about/1/about-the-association-inter-actief' },
            { labelKey: 'Board', route: '/about/2/board' },
            { labelKey: 'Former boards', route: '/about/6/former-boards' },
            { labelKey: 'Honorary members', route: '/about/8/honorary-members/' },
            { labelKey: 'Members of Merit', route: '/about/19/members-of-merit/' },
            { labelKey: 'Committees', route: '/committees/' },
            { labelKey: 'Membership', route: '/about/3/membership/' },
            { labelKey: '(Graduation) drink', route: '/about/26/graduation-drink/' },
            { labelKey: 'Symposia', route: '/about/20/symposia/' },
            { labelKey: 'Study tours', route: '/about/28/study-tours/' },
            { labelKey: "Members' initiative", route: '/about/14/members-initiative/' },
            { labelKey: 'Association song', route: '/about/5/association-song/' },
            { labelKey: 'Alumni Association ENIAC', route: '/about/16/alumni-association-eniac/' },
            { labelKey: 'Sister associations', route: '/about/4/sister-associations/' },
            { labelKey: 'Inter-Actief App', route: '/about/27/the-inter-actief-app/' },
            { labelKey: 'Inter-Archive', url: 'https://inter-archief.net/' },
        ],
    },
    {
        labelKey: 'For members',
        items: [
            { labelKey: 'Azure Dev Tools', route: '/about/24/azure-dev-tools-for-teaching/' },
            { labelKey: 'Assignments by the UT', route: '/about/18/assignments-ut/' },
            { labelKey: 'Corporate identity', url: 'https://huisstijl.ia.utwente.nl/' },
            { labelKey: 'Old privacy policies', route: '/about/25/old-privacy-policies/' },
            { labelKey: 'Social media', route: '/about/31/social-media/' },
            { labelKey: 'Mental health', route: '/about/34/mental-health/' },
        ],
    },
    {
        labelKey: 'Education',
        items: [
            { labelKey: 'Information', route: '/education' },
            { labelKey: 'Books', url: import.meta.env.VITE_WO4YOU_URL },
            { labelKey: 'Summaries', url: 'https://summaries.ia.utwente.nl/' },
            { labelKey: 'Tutoring', route: '/about/29/tutoring/' },
        ],
    },
    {
        labelKey: 'Contact',
        route: '/contact',
    },
] as const
