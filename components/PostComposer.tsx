import React, { useState } from 'react'
import styles from '../styles/PostComposer.module.css'
import Avatar from './Avatar'
import PostImage from './PostImage'

type PostComposerProps = {
  onPost: (content: string, image?: string) => void
  currentUser: {
    username: string
    avatar: string
  }
}

const PostComposer: React.FC<PostComposerProps> = ({ onPost, currentUser }) => {
  const [content, setContent] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && !selectedImage) return

    setIsPosting(true)
    
    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onPost(content, selectedImage || undefined)
    setContent('')
    setSelectedImage(null)
    setIsExpanded(false)
    setIsPosting(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  const canPost = (content.trim().length > 0 || selectedImage) && !isPosting

  return (
    <div className={styles.composer}>
      <div className={styles.header}>
        <Avatar 
          src={currentUser.avatar} 
          alt={`${currentUser.username}'s avatar`}
          size={48}
          className={styles.avatar}
        />
        <div className={styles.inputContainer}>
                      <textarea
              className={`${styles.input} ${isExpanded ? styles.expanded : ''}`}
              placeholder="What's happening?!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              rows={isExpanded ? 4 : 1}
              maxLength={280}
            />
          {selectedImage && (
            <div className={styles.imagePreview}>
              <PostImage src={selectedImage} alt="Selected" width={300} height={200} className={styles.previewImage} />
              <button 
                type="button" 
                className={styles.removeImage}
                onClick={removeImage}
                aria-label="Remove image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className={styles.actions}>
          <div className={styles.mediaActions}>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
            <label htmlFor="image-upload" className={styles.mediaButton} title="Add photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
            </label>
            
            <button className={styles.mediaButton} title="Add GIF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M9 12h6m-6 4h4m2-8h.01" />
              </svg>
            </button>
            
            <button className={styles.mediaButton} title="Add poll">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
            </button>
            
            <button className={styles.mediaButton} title="Add emoji">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
          </div>

          <div className={styles.postActions}>
            <div className={styles.characterCount}>
              <span className={content.length > 250 ? styles.warning : ''}>
                {280 - content.length}
              </span>
            </div>
            <button
              type="submit"
              className={`${styles.postButton} ${canPost ? styles.active : ''}`}
              onClick={handleSubmit}
              disabled={!canPost}
            >
              {isPosting ? (
                <div className={styles.spinner} />
              ) : (
                'post'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostComposer 