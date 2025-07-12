import React, { useState } from 'react'
import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
}

const getInitials = (alt: string) => {
  const words = alt.split(' ')
  if (words.length === 1) return words[0][0]?.toUpperCase() || '?'
  return (words[0][0] || '') + (words[1][0] || '')
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 48, 
  className = ''
}) => {
  const [imgError, setImgError] = useState(false)

  if (imgError || !src) {
    // Fallback: show initials in a circle
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: size * 0.45,
          border: '2px solid var(--border-color)',
          userSelect: 'none',
        }}
        title={alt}
      >
        {getInitials(alt)}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setImgError(true)}
      style={{ borderRadius: '50%' }}
      unoptimized={src.startsWith('http')}
      priority={false}
    />
  )
}

export default Avatar