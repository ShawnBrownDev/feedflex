import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Post.module.css'
import Avatar from './Avatar'
import PostImage from './PostImage'

type PostProps = {
  id: number
  username: string
  displayName?: string
  avatar: string
  content: string
  image?: string
  timestamp: string
  isVerified?: boolean
  isRepost?: boolean
  originalAuthor?: string
  originalDisplayName?: string
  originalAvatar?: string
  repostedBy?: string
  repostedByDisplayName?: string
  likeCount?: number
  commentCount?: number
  repostCount?: number
  onDelete?: (postId: number) => void
  onRepost?: (postId: number, isReposted: boolean) => void
  currentUser?: string
  isRepostedByUser?: boolean
}

const Post: React.FC<PostProps> = ({ 
  id, 
  username, 
  displayName,
  avatar, 
  content, 
  image,
  timestamp,
  isVerified = false,
  isRepost = false,
  originalAuthor,
  originalDisplayName,
  originalAvatar,
  repostedBy,
  repostedByDisplayName,
  likeCount: initialLikeCount = Math.floor(Math.random() * 50) + 1,
  commentCount = Math.floor(Math.random() * 10),
  repostCount = Math.floor(Math.random() * 20),
  onDelete,
  onRepost,
  currentUser,
  isRepostedByUser = false
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isReposted, setIsReposted] = useState(isRepostedByUser)
  const [currentRepostCount, setCurrentRepostCount] = useState(repostCount)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleRepost = () => {
    const newRepostedState = !isReposted
    setIsReposted(newRepostedState)
    setCurrentRepostCount(prev => isReposted ? prev - 1 : prev + 1)
    
    // Call the callback to handle repost in parent component
    if (onRepost) {
      onRepost(id, newRepostedState)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleComment = () => {
    // console.log('Comment clicked for post:', id)
  }

  const handleShare = () => {
    // console.log('Share clicked for post:', id)
  }

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this post?')) {
      onDelete(id)
    }
    setShowDropdown(false)
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  // Check if this post belongs to the current user
  const isOwnPost = currentUser === username
  
  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    // console.log(`Post ${id}: currentUser="${currentUser}", username="${username}", isOwnPost=${isOwnPost}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getAvatarUrl = (url: string) => {
    if (!url || url.startsWith('/avatars/')) {
      // Generate fallback avatar for missing or placeholder images
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || username)}&background=1d9bf0&color=fff&size=48&rounded=true`
    }
    return url
  }

  return (
    <article className={styles.post}>
      {isRepost && repostedBy && (
        <div className={styles.repostHeader}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17,1 21,5 17,9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7,23 3,19 7,15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <span>{repostedByDisplayName || repostedBy} reposted</span>
        </div>
      )}

      <div className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar 
            src={getAvatarUrl(isRepost && originalAvatar ? originalAvatar : avatar)} 
            alt={`${isRepost && originalAuthor ? originalAuthor : username}'s avatar`} 
            size={48}
            className={styles.avatar}
            onError={(e) => {
              const name = isRepost && originalDisplayName ? originalDisplayName : (displayName || username)
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1d9bf0&color=fff&size=48&rounded=true`
            }}
          />
          <div className={styles.userDetails}>
            <div className={styles.nameContainer}>
              <h3 className={styles.displayName}>
                {isRepost && originalDisplayName ? originalDisplayName : (displayName || username)}
              </h3>
              {isVerified && (
                <div className={styles.verifiedBadge} title="Verified account">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.09 2 14.09 2.25 15.02 2.68L16.46 1.24C17.07 0.63 18.07 0.63 18.68 1.24C19.29 1.85 19.29 2.85 18.68 3.46L17.24 4.9C18.31 6.16 19 7.77 19 9.5V15.5C19 18.54 16.54 21 13.5 21H10.5C7.46 21 5 18.54 5 15.5V9.5C5 6.46 7.46 4 10.5 4H13.5C11.77 4 10.16 4.69 8.9 5.76L7.46 4.32C6.85 3.71 6.85 2.71 7.46 2.1C8.07 1.49 9.07 1.49 9.68 2.1L11.12 3.54C11.41 3.25 11.7 2.97 12 2.68C12.91 2.25 13.91 2 15 2H12ZM12 6L10.5 7.5L12 9L13.5 7.5L12 6Z" />
                  </svg>
                </div>
              )}
              <span className={styles.username}>@{isRepost && originalAuthor ? originalAuthor : username}</span>
              <span className={styles.separator}>·</span>
              <time className={styles.timestamp} dateTime={timestamp}>
                {timestamp}
              </time>
            </div>
          </div>
        </div>
        <div className={styles.menuContainer}>
          <button 
            className={styles.menuButton} 
            aria-label="Post options"
            onClick={handleMenuClick}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
          {showDropdown && (
            <div className={styles.dropdown} ref={dropdownRef}>
              {isOwnPost && (
                <button 
                  className={styles.dropdownItem}
                  onClick={handleDelete}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6" />
                    <path d="M19,6V20a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6M8,6V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2V6" />
                  </svg>
                  Delete
                </button>
              )}
              <button 
                className={styles.dropdownItem}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setShowDropdown(false)
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Copy link
              </button>
              <button 
                className={styles.dropdownItem}
                onClick={() => {
                  // console.log('Report post:', id)
                  setShowDropdown(false)
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
                Report post
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <p>{content}</p>
        {image && (
          <div className={styles.imageContainer}>
            <PostImage 
              src={image} 
              alt="Post image" 
              className={styles.postImage}
              onClick={() => setShowFullImage(true)}
            />
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.actionButton}
          onClick={handleComment}
          aria-label="Comment on post"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className={styles.actionText}>{formatCount(commentCount)}</span>
        </button>

        <button 
          className={`${styles.actionButton} ${isReposted ? styles.reposted : ''}`}
          onClick={handleRepost}
          aria-label={isReposted ? 'Undo repost' : 'Repost'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17,1 21,5 17,9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7,23 3,19 7,15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <span className={styles.actionText}>{formatCount(currentRepostCount)}</span>
        </button>

        <button 
          className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <svg viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className={styles.actionText}>{formatCount(likeCount)}</span>
        </button>

        <button 
          className={`${styles.actionButton} ${isBookmarked ? styles.bookmarked : ''}`}
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
        >
          <svg viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        <button 
          className={styles.actionButton}
          onClick={handleShare}
          aria-label="Share post"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>

      {showFullImage && image && (
        <div className={styles.imageModal} onClick={() => setShowFullImage(false)}>
          <div className={styles.imageModalContent}>
            <PostImage src={image} alt="Post image full size" width={800} height={600} />
            <button 
              className={styles.closeModal}
              onClick={() => setShowFullImage(false)}
              aria-label="Close image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

export default Post
