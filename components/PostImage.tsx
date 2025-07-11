import React from 'react'
import Image from 'next/image'

interface PostImageProps {
  src: string
  alt: string
  className?: string
  onClick?: () => void
  width?: number
  height?: number
}

const PostImage: React.FC<PostImageProps> = ({ 
  src, 
  alt, 
  className = '',
  onClick,
  width = 500,
  height = 300
}) => {
  // Always use Next.js Image component with proper configuration
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      style={{ 
        width: '100%', 
        height: 'auto',
        borderRadius: '16px',
        cursor: onClick ? 'pointer' : 'default'
      }}
      unoptimized={src.startsWith('http')}
      priority={false}
    />
  )
}

export default PostImage 