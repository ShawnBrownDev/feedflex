import type { NextPage } from 'next'
import { useState, useEffect, useRef } from 'react'
import Post from '../components/Post'
import PostComposer from '../components/PostComposer'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'
import styles from '../styles/Home.module.css'
import { initialPosts } from '../data/post'
import { followingPosts } from '../data/followingPosts'
import { getUserById } from '../data/users'

type Props = {
  theme: string
  setTheme: (theme: string) => void
}

type PostType = {
  id: number
  username: string
  displayName: string
  avatar: string
  content: string
  image?: string
  timestamp: string
  isVerified: boolean
  likeCount: number
  commentCount: number
  repostCount: number
  isRepost?: boolean
  originalAuthor?: string
  originalDisplayName?: string
  originalAvatar?: string
  repostedBy?: string
  repostedByDisplayName?: string
}

type FeedTab = 'for-you' | 'following'

const currentUser = getUserById('sb-studio')!

const POSTS_STORAGE_KEY = 'feedflex_posts'
const FOLLOWING_POSTS_STORAGE_KEY = 'feedflex_following_posts'
const REPOSTS_STORAGE_KEY = 'feedflex_reposts'

const Home: NextPage<Props> = ({ theme, setTheme }) => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [followingPostsData, setFollowingPostsData] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDevMenu, setShowDevMenu] = useState(false)
  const [userReposts, setUserReposts] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState<FeedTab>('for-you')
  const devMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadPosts = () => {
      try {
        // Load main posts
        const savedPosts = localStorage.getItem(POSTS_STORAGE_KEY)
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts)
          setPosts(parsedPosts)
        } else {
          // If no saved posts, use initial posts and save them
          setPosts(initialPosts)
          localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialPosts))
        }

        // Load following posts
        const savedFollowingPosts = localStorage.getItem(FOLLOWING_POSTS_STORAGE_KEY)
        if (savedFollowingPosts) {
          const parsedFollowingPosts = JSON.parse(savedFollowingPosts)
          setFollowingPostsData(parsedFollowingPosts)
        } else {
          // If no saved following posts, use initial following posts and save them
          setFollowingPostsData(followingPosts)
          localStorage.setItem(FOLLOWING_POSTS_STORAGE_KEY, JSON.stringify(followingPosts))
        }

        // Load user reposts
        const savedReposts = localStorage.getItem(REPOSTS_STORAGE_KEY)
        if (savedReposts) {
          const parsedReposts = JSON.parse(savedReposts)
          setUserReposts(new Set(parsedReposts))
        }
      } catch (error) {
        console.error('Error loading posts from localStorage:', error)
        setPosts(initialPosts)
        setFollowingPostsData(followingPosts)
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])
  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      try {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts))
      } catch (error) {
        console.error('Error saving posts to localStorage:', error)
      }
    }
  }, [posts, isLoading])

  // Save following posts to localStorage whenever following posts change
  useEffect(() => {
    if (!isLoading && followingPostsData.length > 0) {
      try {
        localStorage.setItem(FOLLOWING_POSTS_STORAGE_KEY, JSON.stringify(followingPostsData))
      } catch (error) {
        console.error('Error saving following posts to localStorage:', error)
      }
    }
  }, [followingPostsData, isLoading])

  // Save user reposts to localStorage whenever reposts change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(REPOSTS_STORAGE_KEY, JSON.stringify(Array.from(userReposts)))
      } catch (error) {
        console.error('Error saving reposts to localStorage:', error)
      }
    }
  }, [userReposts, isLoading])

  // Close dev menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (devMenuRef.current && !devMenuRef.current.contains(event.target as Node)) {
        setShowDevMenu(false)
      }
    }
    if (showDevMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDevMenu])

  const handleNewPost = (content: string, image?: string) => {
    const newPost: PostType = {
      id: Date.now(),
      username: currentUser.username,
      displayName: currentUser.displayName,
      avatar: currentUser.avatar,
      content,
      image,
      timestamp: 'now',
      isVerified: currentUser.isVerified,
      likeCount: 0,
      commentCount: 0,
      repostCount: 0,
    }
    
    // Add new post to both feeds since it's from the current user
    const updatedPosts = [newPost, ...posts]
    const updatedFollowingPosts = [newPost, ...followingPostsData]
    setPosts(updatedPosts)
    setFollowingPostsData(updatedFollowingPosts)
  }

  // Developer utility to clear all posts
  const clearAllPosts = () => {
    if (confirm('Are you sure you want to clear all posts? This cannot be undone.')) {
      setPosts([])
      setFollowingPostsData([])
      localStorage.removeItem(POSTS_STORAGE_KEY)
      localStorage.removeItem(FOLLOWING_POSTS_STORAGE_KEY)
    }
  }

  // Developer utility to reset to initial posts
  const resetPosts = () => {
    if (confirm('Reset to initial posts? This will remove all your custom posts.')) {
      setPosts(initialPosts)
      setFollowingPostsData(followingPosts)
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialPosts))
      localStorage.setItem(FOLLOWING_POSTS_STORAGE_KEY, JSON.stringify(followingPosts))
    }
  }

  // Delete post function
  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId)
    const updatedFollowingPosts = followingPostsData.filter(post => post.id !== postId)
    setPosts(updatedPosts)
    setFollowingPostsData(updatedFollowingPosts)
  }

  // Repost function
  const handleRepost = (postId: number, isReposted: boolean) => {
    const currentPosts = activeTab === 'following' ? followingPostsData : posts
    const setCurrentPosts = activeTab === 'following' ? setFollowingPostsData : setPosts
    
    if (isReposted) {
      // Create a repost entry
      const originalPost = currentPosts.find(post => post.id === postId)
      if (originalPost) {
        const repost: PostType = {
          id: Date.now(),
          username: originalPost.username,
          displayName: originalPost.displayName,
          avatar: originalPost.avatar,
          content: originalPost.content,
          image: originalPost.image,
          timestamp: originalPost.timestamp,
          isVerified: originalPost.isVerified,
          likeCount: originalPost.likeCount,
          commentCount: originalPost.commentCount,
          repostCount: originalPost.repostCount,
          isRepost: true,
          originalAuthor: originalPost.username,
          originalDisplayName: originalPost.displayName,
          originalAvatar: originalPost.avatar,
          repostedBy: currentUser.username,
          repostedByDisplayName: currentUser.displayName
        }
        
        // Add repost to the current feed
        const updatedPosts = [repost, ...currentPosts]
        setCurrentPosts(updatedPosts)
        
        // Track that user has reposted this post
        setUserReposts(prev => new Set([...prev, postId]))
      }
    } else {
      // Remove repost
      const originalPost = currentPosts.find(post => post.id === postId)
      if (originalPost) {
        const updatedPosts = currentPosts.filter(post => {
          return !(post.isRepost && 
                  post.repostedBy === currentUser.username && 
                  post.originalAuthor === originalPost.username)
        })
        setCurrentPosts(updatedPosts)
        
        // Remove from user reposts tracking
        setUserReposts(prev => {
          const newSet = new Set(prev)
          newSet.delete(postId)
          return newSet
        })
      }
    }
  }

  // Filter posts based on active tab
  const getFilteredPosts = () => {
    if (activeTab === 'following') {
      return followingPostsData
    }
    
    // For "For you" tab, show all posts
    return posts
  }

  // Handle tab click
  const handleTabClick = (tab: FeedTab) => {
    setActiveTab(tab)
  }

      return (
      <div className={styles.app}>
      <main className={styles.main}>
        <Navigation theme={theme} setTheme={setTheme} />
        <div className={styles.mainContent}>
          <div className={styles.feedContainer}>
            <div className={styles.feedHeader}>
              <h1 className={styles.feedTitle}>Home</h1>
              <div className={styles.headerActions}>
                <button 
                  className={styles.settingsButton}
                  onClick={() => setShowDevMenu(!showDevMenu)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-2c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5z" />
                  </svg>
                </button>
                {showDevMenu && (
                  <div className={styles.devMenu} ref={devMenuRef}>
                    <button onClick={clearAllPosts} className={styles.devMenuItem}>
                      Clear All Posts
                    </button>
                    <button onClick={resetPosts} className={styles.devMenuItem}>
                      Reset to Initial Posts
                    </button>
                    <div className={styles.devMenuInfo}>
                      <small>Posts saved: {posts.length}</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.feedTabs}>
              <button 
                className={`${styles.feedTab} ${activeTab === 'for-you' ? styles.active : ''}`}
                onClick={() => handleTabClick('for-you')}
              >
                For you
              </button>
              <button 
                className={`${styles.feedTab} ${activeTab === 'following' ? styles.active : ''}`}
                onClick={() => handleTabClick('following')}
              >
                Following
              </button>
            </div>
            
            <PostComposer onPost={handleNewPost} currentUser={currentUser} />
            
            <section className={styles.feed} role="feed" aria-label="Timeline">
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading posts...</p>
                </div>
              ) : (() => {
                const filteredPosts = getFilteredPosts()
                return filteredPosts.length === 0 ? (
                  <div className={styles.emptyState}>
                    {activeTab === 'following' ? (
                      <div>
                        <p>No posts from people you follow yet.</p>
                        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                          Follow more people to see their posts here!
                        </p>
                      </div>
                    ) : (
                      <p>No posts yet. Create your first post!</p>
                    )}
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <Post 
                      key={post.id} 
                      {...post} 
                      onDelete={handleDeletePost}
                      onRepost={handleRepost}
                      currentUser={currentUser.username}
                      isRepostedByUser={userReposts.has(post.id)}
                    />
                  ))
                )
              })()}
            </section>
          </div>
          <Sidebar />
        </div>
      </main>
    </div>
  )
}

export default Home
