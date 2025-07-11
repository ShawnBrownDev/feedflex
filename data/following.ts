export type FollowingRelationship = {
  followerId: string
  followingId: string
  followedAt: string
}

// Initial following relationships - SB Studio follows some users
export const initialFollowing: FollowingRelationship[] = [
  {
    followerId: 'sb-studio',
    followingId: 'techguru',
    followedAt: '2024-01-15T10:30:00Z'
  },
  {
    followerId: 'sb-studio',
    followingId: 'designpro',
    followedAt: '2024-01-20T14:22:00Z'
  },
  {
    followerId: 'sb-studio',
    followingId: 'janedoe',
    followedAt: '2024-02-03T09:15:00Z'
  },
  // Some users follow SB Studio back
  {
    followerId: 'techguru',
    followingId: 'sb-studio',
    followedAt: '2024-01-16T11:45:00Z'
  },
  {
    followerId: 'designpro',
    followingId: 'sb-studio',
    followedAt: '2024-01-21T16:30:00Z'
  },
  {
    followerId: 'alicewonder',
    followingId: 'sb-studio',
    followedAt: '2024-02-10T13:20:00Z'
  },
  // Other relationships
  {
    followerId: 'janedoe',
    followingId: 'techguru',
    followedAt: '2024-01-10T08:00:00Z'
  },
  {
    followerId: 'alicewonder',
    followingId: 'designpro',
    followedAt: '2024-01-25T12:00:00Z'
  },
  {
    followerId: 'bobbuilder',
    followingId: 'devlife',
    followedAt: '2024-02-01T15:30:00Z'
  }
]

export class FollowingService {
  private static followingData: FollowingRelationship[] = [...initialFollowing]

  // Check if user A follows user B
  static isFollowing(followerId: string, followingId: string): boolean {
    return this.followingData.some(
      rel => rel.followerId === followerId && rel.followingId === followingId
    )
  }

  // Get all users that a specific user follows
  static getFollowing(userId: string): string[] {
    return this.followingData
      .filter(rel => rel.followerId === userId)
      .map(rel => rel.followingId)
  }

  // Get all users that follow a specific user
  static getFollowers(userId: string): string[] {
    return this.followingData
      .filter(rel => rel.followingId === userId)
      .map(rel => rel.followerId)
  }

  // Follow a user
  static follow(followerId: string, followingId: string): boolean {
    if (followerId === followingId) return false // Can't follow yourself
    if (this.isFollowing(followerId, followingId)) return false // Already following

    this.followingData.push({
      followerId,
      followingId,
      followedAt: new Date().toISOString()
    })
    return true
  }

  // Unfollow a user
  static unfollow(followerId: string, followingId: string): boolean {
    const index = this.followingData.findIndex(
      rel => rel.followerId === followerId && rel.followingId === followingId
    )
    
    if (index === -1) return false // Not following
    
    this.followingData.splice(index, 1)
    return true
  }

  // Get suggested users to follow (users not currently followed)
  static getSuggestedUsers(userId: string, allUserIds: string[]): string[] {
    const following = this.getFollowing(userId)
    return allUserIds.filter(id => id !== userId && !following.includes(id))
  }

  // Get follow count for a user
  static getFollowCounts(userId: string): { followers: number; following: number } {
    return {
      followers: this.getFollowers(userId).length,
      following: this.getFollowing(userId).length
    }
  }
} 