import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface SafeMapContainerProps {
  className?: string;
  onContainerReady?: (container: HTMLDivElement) => void;
}

export interface SafeMapContainerHandle {
  cleanup: () => void;
}

/**
 * SafeMapContainer - A completely isolated map container that prevents
 * Google Maps DOM manipulation errors
 * 
 * This component creates a detached DOM node that Google Maps can safely
 * manipulate without interfering with React's virtual DOM
 */
export const SafeMapContainer = forwardRef<SafeMapContainerHandle, SafeMapContainerProps>(
  ({ className = '', onContainerReady }, ref) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const isCleanedUp = useRef(false);

    useEffect(() => {
      // Create inner container
      const innerContainer = document.createElement('div');
      innerContainer.style.width = '100%';
      innerContainer.style.height = '100%';
      innerContainer.style.position = 'relative';
      
      if (outerRef.current) {
        outerRef.current.appendChild(innerContainer);
        innerRef.current = innerContainer;
        
        // Notify parent that container is ready
        if (onContainerReady) {
          onContainerReady(innerContainer);
        }
      }

      // Cleanup
      return () => {
        if (isCleanedUp.current) return;
        isCleanedUp.current = true;

        // Use requestAnimationFrame to ensure cleanup happens after React's DOM updates
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (innerRef.current && outerRef.current) {
              try {
                // Method 1: textContent (safest)
                innerRef.current.textContent = '';
                
                // Wait a bit then remove
                setTimeout(() => {
                  if (innerRef.current && outerRef.current && outerRef.current.contains(innerRef.current)) {
                    try {
                      outerRef.current.removeChild(innerRef.current);
                    } catch (e) {
                      // Silently ignore
                    }
                  }
                  innerRef.current = null;
                }, 10);
              } catch (e) {
                // Silently ignore
              }
            }
          });
        });
      };
    }, [onContainerReady]);

    // Expose cleanup method
    useImperativeHandle(ref, () => ({
      cleanup: () => {
        if (isCleanedUp.current) return;
        isCleanedUp.current = true;

        if (innerRef.current) {
          try {
            innerRef.current.textContent = '';
          } catch (e) {
            // Silent
          }
        }
      }
    }));

    return (
      <div 
        ref={outerRef} 
        className={className}
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      />
    );
  }
);

SafeMapContainer.displayName = 'SafeMapContainer';
