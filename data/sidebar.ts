import { users, getUserById, formatFollowerCount } from './users'
import { FollowingService } from './following'

export const trendingTopics = [
  { 
    topic: 'OpenAI', 
    category: 'Technology', 
    posts: '847K',
    description: 'ChatGPT updates and AI developments',
    isPromoted: false,
    changeType: 'up' as const
  },
  { 
    topic: '#BlackFriday', 
    category: 'Trending in United States', 
    posts: '1.2M',
    description: 'Black Friday deals and shopping',
    isPromoted: false,
    changeType: 'up' as const
  },
  { 
    topic: 'React 19', 
    category: 'Technology', 
    posts: '156K',
    description: 'New React features and updates',
    isPromoted: false,
    changeType: 'up' as const
  },
  { 
    topic: '#TechTwitter', 
    category: 'Technology', 
    posts: '89K',
    description: 'Developer community discussions',
    isPromoted: false,
    changeType: 'stable' as const
  },
  { 
    topic: 'Thanksgiving', 
    category: 'Trending in United States', 
    posts: '2.1M',
    description: 'Thanksgiving celebrations and gratitude',
    isPromoted: false,
    changeType: 'up' as const
  },
  { 
    topic: '#WebDev', 
    category: 'Technology', 
    posts: '234K',
    description: 'Web development tips and trends',
    isPromoted: false,
    changeType: 'down' as const
  },
]

export type SuggestedUser = {
  id: string
  username: string
  displayName: string
  avatar: string
  isVerified: boolean
  followers: string
  isFollowing: boolean
}

export const getSuggestedUsers = (currentUserId: string = 'sb-studio'): SuggestedUser[] => {
  // Get users that the current user is not following
  const suggestedUserIds = FollowingService.getSuggestedUsers(
    currentUserId, 
    users.map(u => u.id)
  )
  
  // Get the first 3 suggested users
  return suggestedUserIds.slice(0, 3).map(userId => {
    const user = getUserById(userId)
    if (!user) return null
    
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      isVerified: user.isVerified,
      followers: formatFollowerCount(user.followers),
      isFollowing: FollowingService.isFollowing(currentUserId, userId)
    }
  }).filter(Boolean) as SuggestedUser[]
}

// Legacy export for backward compatibility
export const suggestedUsers = getSuggestedUsers()