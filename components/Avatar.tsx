import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 48, 
  className = '',
  onError 
}) => {
  // Always use Next.js Image component with proper configuration
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={onError}
      style={{ borderRadius: '50%' }}
      unoptimized={src.startsWith('http')}
      priority={false}
    />
  )
}

export default Avatar