import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/Sidebar.module.css'
import { trendingTopics, getSuggestedUsers, type SuggestedUser } from '../data/sidebar'
import { FollowingService } from '../data/following'
import Avatar from './Avatar'
import ProfilePopover from './ProfilePopover';

const Sidebar: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([])
  const currentUserId = 'sb-studio' // This would come from auth context in a real app
  const [hoveredUser, setHoveredUser] = useState<SuggestedUser | null>(null);
  const [popoverPos, setPopoverPos] = useState<{top: number, left: number} | null>(null);
  const popoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load suggested users on component mount
    setSuggestedUsers(getSuggestedUsers(currentUserId))
  }, [currentUserId])

  const handleFollow = (userId: string) => {
    const success = FollowingService.follow(currentUserId, userId)
    if (success) {
      // Update the suggested users list to reflect the new following status
      setSuggestedUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, isFollowing: true }
            : user
        )
      )
    }
  }

  const handleUnfollow = (userId: string) => {
    const success = FollowingService.unfollow(currentUserId, userId)
    if (success) {
      // Update the suggested users list to reflect the new following status
      setSuggestedUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, isFollowing: false }
            : user
        )
      )
    }
  }

  const handleUserMouseEnter = (user: SuggestedUser, e: React.MouseEvent) => {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopoverPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    setHoveredUser(user);
  };
  const handleUserMouseLeave = () => {
    popoverTimeout.current = setTimeout(() => setHoveredUser(null), 150);
  };
  const handlePopoverMouseEnter = () => {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
  };
  const handlePopoverMouseLeave = () => {
    setHoveredUser(null);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Trending Topics */}
      <div className={styles.widget}>
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>What&apos;s happening</h3>
          <button className={styles.widgetSettings} aria-label="Settings">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-2c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5z"/>
            </svg>
          </button>
        </div>
        <div className={styles.trendingList}>
          {trendingTopics.slice(0, 5).map((trend, index) => (
            <div key={index} className={styles.trendingItem}>
              <div className={styles.trendingContent}>
                <div className={styles.trendingMeta}>
                  <span className={styles.trendingCategory}>{trend.category}</span>
                  {trend.changeType === 'up' && (
                    <div className={styles.trendingIndicator}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                    </div>
                  )}
                  {trend.changeType === 'down' && (
                    <div className={styles.trendingIndicator} data-direction="down">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <span className={styles.trendingTopic}>{trend.topic}</span>
                <span className={styles.trendingCount}>{trend.posts} posts</span>
              </div>
              <button className={styles.trendingMenu} aria-label="More options">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button className={styles.showMore}>Show more</button>
      </div>

      {/* Suggested Users */}
      <div className={styles.widget}>
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>Who to follow</h3>
        </div>
        <div className={styles.suggestedList}>
          {suggestedUsers.map((user) => (
            <div key={user.id} className={styles.suggestedItem}>
              <div className={styles.suggestedUser}>
                <span
                  onMouseEnter={e => handleUserMouseEnter(user, e)}
                  onMouseLeave={handleUserMouseLeave}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Avatar 
                    src={user.avatar}
                    alt={`${user.displayName}&apos;s avatar`}
                    size={36}
                    className={styles.suggestedAvatar}
                  />
                </span>
                <div className={styles.suggestedInfo}>
                  <span
                    className={styles.displayName}
                    onMouseEnter={e => handleUserMouseEnter(user, e)}
                    onMouseLeave={handleUserMouseLeave}
                    style={{ cursor: 'pointer' }}
                  >
                    {user.displayName}
                  </span>
                  {user.isVerified && (
                    <div className={styles.verifiedBadge} title="Verified account">
                      <svg viewBox="0 0 22 22" fill="currentColor">
                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                      </svg>
                    </div>
                  )}
                  <span className={styles.username}>@{user.username}</span>
                  <span className={styles.followerCount}>{user.followers} followers</span>
                </div>
              </div>
              <button 
                className={`${styles.followButton} ${user.isFollowing ? styles.following : ''}`}
                onClick={() => user.isFollowing ? handleUnfollow(user.id) : handleFollow(user.id)}
                title={user.isFollowing ? 'Unfollow' : 'Follow'}
                aria-label={user.isFollowing ? 'Unfollow' : 'Follow'}
              >
                <span>{user.isFollowing ? 'Following' : 'Follow'}</span>
              </button>
            </div>
          ))}
        </div>
        {hoveredUser && popoverPos && (
          <div
            style={{ position: 'absolute', top: popoverPos.top, left: popoverPos.left, zIndex: 2000 }}
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
          >
            <ProfilePopover
              displayName={hoveredUser.displayName}
              username={hoveredUser.username}
              avatar={hoveredUser.avatar}
              bio={hoveredUser.bio}
              links={hoveredUser.links}
              followers={hoveredUser.followers}
              following={hoveredUser.following}
              isVerified={hoveredUser.isVerified}
              isFollowing={hoveredUser.isFollowing}
              onFollow={() => handleFollow(hoveredUser.id)}
              onUnfollow={() => handleUnfollow(hoveredUser.id)}
            />
          </div>
        )}
        <button className={styles.showMore}>Show more</button>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          <a href="#">Ads Info</a>
        </div>
        <p className={styles.copyright}>© 2025 FeedFlex, Inc. Made by <a href="https://portfolio-xi-lyart-1xxet5hw0h.vercel.app" target="_blank" rel="noopener noreferrer">Shawn Brown</a></p>
      </div>
    </aside>
  )
}

export default Sidebar 