import { motion } from 'motion/react';
import {
  LOGO_ICON,
  getBrandName,
  getBrandTagline,
  getFontClass,
  getLogoContainerClasses,
  getLogoIconClasses,
  getLogoTextClasses,
  getLogoSubtitleClasses,
  type LogoSize,
} from '../utils/brandConfig';

interface TalentTutorLogoProps {
  size?: LogoSize;
  showText?: boolean;
  showSubtitle?: boolean;
  onClick?: () => void;
  className?: string;
  language?: 'en' | 'bn';
}

export function TalentTutorLogo({ 
  size = 'md', 
  showText = true,
  showSubtitle = false,
  onClick,
  className = '',
  language = 'en'
}: TalentTutorLogoProps) {
  
  const LogoIconComponent = LOGO_ICON;
  const brandName = getBrandName(language);
  const brandTagline = getBrandTagline(language);

  return (
    <motion.div 
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer' : ''} group ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {/* Logo Icon with gradient and glow */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className={getLogoContainerClasses(size, true) + ' group-hover:shadow-emerald-500/50 transition-all'}>
          <LogoIconComponent className={getLogoIconClasses(size)} strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className={getLogoTextClasses(size, language)}>
              {brandName}
            </span>
          </div>
          {showSubtitle && (
            <p className={getLogoSubtitleClasses(size, language)}>{brandTagline}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
