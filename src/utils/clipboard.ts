/**
 * Safely copy text to clipboard with fallback support
 * Silently falls back to alternative methods when Clipboard API is blocked
 * @param text - Text to copy
 * @returns Promise<boolean> - Success status
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first (only in secure contexts)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Silent fallback - no console warnings for blocked clipboard API
      // This is expected in some browser contexts
    }
  }

  // Fallback method for older browsers or when clipboard API is blocked
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it invisible but accessible for copying
    textArea.style.position = 'fixed';
    textArea.style.top = '-999px';
    textArea.style.left = '-999px';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    
    // Add to DOM
    document.body.appendChild(textArea);
    
    // iOS requires contentEditable
    textArea.contentEditable = 'true';
    textArea.readOnly = false;
    
    // Select the text
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      // iOS specific selection
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
      textArea.setSelectionRange(0, text.length);
    }
    
    // Try to copy
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      successful = false;
    }
    
    // Clean up
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error('All clipboard methods failed:', err);
    }
    return false;
  }
}
