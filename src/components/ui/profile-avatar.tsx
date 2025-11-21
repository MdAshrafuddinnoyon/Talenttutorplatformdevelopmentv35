import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { cn } from './utils';

export interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  online?: boolean;
  verified?: boolean;
  editable?: boolean;
  onEditClick?: () => void;
}

const sizeClasses = {
  xs: 'w-8 h-8 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-32 h-32 text-2xl',
};

const ringClasses = {
  xs: 'ring-2',
  sm: 'ring-2',
  md: 'ring-2',
  lg: 'ring-2',
  xl: 'ring-4',
};

export function ProfileAvatar({
  src,
  alt = 'Profile',
  fallback,
  size = 'md',
  className,
  online = false,
  verified = false,
  editable = false,
  onEditClick,
}: ProfileAvatarProps) {
  const sizeClass = sizeClasses[size];
  const ringClass = ringClasses[size];

  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar className={cn(sizeClass, 'flex-shrink-0')}>
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          {fallback || alt.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Online Indicator */}
      {online && (
        <div
          className={cn(
            'absolute bottom-0 right-0 bg-green-500 rounded-full border-2 border-white',
            size === 'xs' && 'w-2 h-2',
            size === 'sm' && 'w-2.5 h-2.5',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-4 h-4',
            size === 'xl' && 'w-5 h-5'
          )}
        />
      )}

      {/* Verified Badge */}
      {verified && (
        <div
          className={cn(
            'absolute top-0 right-0 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white',
            size === 'xs' && 'w-3 h-3',
            size === 'sm' && 'w-4 h-4',
            size === 'md' && 'w-5 h-5',
            size === 'lg' && 'w-6 h-6',
            size === 'xl' && 'w-8 h-8'
          )}
        >
          <svg
            className={cn(
              'text-white',
              size === 'xs' && 'w-2 h-2',
              size === 'sm' && 'w-2.5 h-2.5',
              size === 'md' && 'w-3 h-3',
              size === 'lg' && 'w-4 h-4',
              size === 'xl' && 'w-5 h-5'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Edit Button */}
      {editable && onEditClick && (
        <button
          onClick={onEditClick}
          className={cn(
            'absolute bottom-0 right-0 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center transition-colors',
            size === 'xs' && 'w-5 h-5',
            size === 'sm' && 'w-6 h-6',
            size === 'md' && 'w-8 h-8',
            size === 'lg' && 'w-10 h-10',
            size === 'xl' && 'w-12 h-12'
          )}
        >
          <svg
            className={cn(
              'text-white',
              size === 'xs' && 'w-2.5 h-2.5',
              size === 'sm' && 'w-3 h-3',
              size === 'md' && 'w-4 h-4',
              size === 'lg' && 'w-5 h-5',
              size === 'xl' && 'w-6 h-6'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// Preset variants for specific use cases
export function MessageAvatar(props: Omit<ProfileAvatarProps, 'size'>) {
  return <ProfileAvatar {...props} size="xs" />;
}

export function ListAvatar(props: Omit<ProfileAvatarProps, 'size'>) {
  return <ProfileAvatar {...props} size="sm" />;
}

export function CardAvatar(props: Omit<ProfileAvatarProps, 'size'>) {
  return <ProfileAvatar {...props} size="md" />;
}

export function HeaderAvatar(props: Omit<ProfileAvatarProps, 'size'>) {
  return <ProfileAvatar {...props} size="lg" />;
}

export function ProfilePageAvatar(props: Omit<ProfileAvatarProps, 'size'>) {
  return <ProfileAvatar {...props} size="xl" />;
}
