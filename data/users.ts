export type User = {
  id: string
  username: string
  displayName: string
  avatar: string
  bio?: string
  isVerified: boolean
  followers: number
  following: number
  posts: number
  location?: string
  website?: string
  joinedDate: string
}

export const users: User[] = [
  {
    id: 'sb-studio',
    username: 'SB Studio',
    displayName: 'Shawn Brown',
    avatar: 'https://ui-avatars.com/api/?name=Shawn+Brown&background=1d9bf0&color=fff&size=48',
    bio: 'Software Developer & Designer | Building amazing web experiences',
    isVerified: false,
    followers: 1247,
    following: 892,
    posts: 156,
    location: 'San Francisco, CA',
    website: 'https://sbstudio.dev',
    joinedDate: 'January 2020'
  },
  {
    id: 'aritzia',
    username: 'ARITZIA',
    displayName: 'aritzia',
    avatar: 'https://ui-avatars.com/api/?name=AR&background=000000&color=fff&size=48&bold=true',
    bio: 'Everyday luxury. Beautifully designed clothes for women.',
    isVerified: true,
    followers: 1200000,
    following: 234,
    posts: 3421,
    location: 'Vancouver, Canada',
    website: 'https://aritzia.com',
    joinedDate: 'March 2015'
  },
  {
    id: 'zackg',
    username: 'lisalimbaugh',
    displayName: 'zackg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Tech enthusiast | Coffee lover ☕ | Building the future',
    isVerified: false,
    followers: 45200,
    following: 1834,
    posts: 892,
    location: 'Austin, TX',
    website: 'https://zackg.dev',
    joinedDate: 'June 2018'
  },
  {
    id: 'fashionweek',
    username: 'FashionweekNYC',
    displayName: 'Spread Love and Ki...',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Fashion Week NYC | Spreading love through style 💕 | Official updates',
    isVerified: true,
    followers: 892000,
    following: 567,
    posts: 2134,
    location: 'New York, NY',
    website: 'https://fashionweeknyc.com',
    joinedDate: 'September 2016'
  },
  {
    id: 'techguru',
    username: 'techguru',
    displayName: 'Tech Guru',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Senior Software Engineer | Open Source Contributor | Mentor',
    isVerified: true,
    followers: 156000,
    following: 2341,
    posts: 1567,
    location: 'Seattle, WA',
    website: 'https://techguru.io',
    joinedDate: 'April 2017'
  },
  {
    id: 'designpro',
    username: 'designpro',
    displayName: 'Design Pro',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'UX/UI Designer | Creating beautiful digital experiences ✨',
    isVerified: false,
    followers: 23400,
    following: 892,
    posts: 634,
    location: 'Los Angeles, CA',
    website: 'https://designpro.studio',
    joinedDate: 'November 2019'
  },
  {
    id: 'janedoe',
    username: 'janedoe',
    displayName: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Digital nomad | Travel blogger | Photography enthusiast 📸',
    isVerified: true,
    followers: 67800,
    following: 1234,
    posts: 2890,
    location: 'Bali, Indonesia',
    website: 'https://janedoe.blog',
    joinedDate: 'February 2018'
  },
  {
    id: 'alicewonder',
    username: 'alicewonder',
    displayName: 'Alice Wonder',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Product Manager | Tech Writer | Startup Advisor',
    isVerified: false,
    followers: 34500,
    following: 567,
    posts: 1234,
    location: 'Boston, MA',
    website: 'https://alicewonder.com',
    joinedDate: 'August 2020'
  },
  {
    id: 'bobbuilder',
    username: 'bobbuilder',
    displayName: 'Bob Builder',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Full-stack Developer | Building cool stuff with React & Node.js',
    isVerified: false,
    followers: 12300,
    following: 345,
    posts: 567,
    location: 'Denver, CO',
    website: 'https://bobbuilder.dev',
    joinedDate: 'May 2021'
  },
  {
    id: 'devlife',
    username: 'devlife',
    displayName: 'Dev Life',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=48&h=48&fit=crop&crop=face&auto=format',
    bio: 'Software Engineer | Code reviewer | Debugging master 🐛',
    isVerified: false,
    followers: 89000,
    following: 1567,
    posts: 3456,
    location: 'Portland, OR',
    website: 'https://devlife.codes',
    joinedDate: 'January 2019'
  }
]

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username)
}

export const formatFollowerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
} 