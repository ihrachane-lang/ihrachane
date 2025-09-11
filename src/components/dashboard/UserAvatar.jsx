'use client';

import Image from 'next/image';
import { useState } from 'react';

const UserAvatar = ({ user, size = 30, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  
  // If user has an image and no error, show the image
  if (user?.image && !imageError) {
    return (
      <div className={`rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
        <Image
          src={user.image}
          alt={user.name || 'User'}
          width={size}
          height={size}
          className="rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }
  
  // Fallback to initials if no image or image failed to load
  const getInitials = () => {
    if (!user?.name) return 'U'; // Default to 'U' if no name
    
    const names = user.name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    // Get first character of first and last name
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };
  
  const backgroundColor = `hsl(${user?.name ? 
    (user.name.charCodeAt(0) * 13) % 360 : 
    200}, 70%, 50%)`;
  
  return (
    <div 
      className={`rounded-full flex items-center justify-center text-white font-medium ${className}`}
      style={{ 
        width: size, 
        height: size, 
        backgroundColor,
        fontSize: size * 0.4
      }}
    >
      {getInitials()}
    </div>
  );
};

export default UserAvatar;