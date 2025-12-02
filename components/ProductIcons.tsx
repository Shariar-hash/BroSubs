'use client'

import Image from 'next/image'

export function ChatGPTIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={className}>
      <Image 
        src="/logos/Chatgpt Pro.png" 
        alt="ChatGPT Pro" 
        width={256}
        height={256}
        className="w-full h-full object-contain scale-110"
        onError={(e) => {
          // Fallback to SVG if image fails
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

export function GeminiIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={className}>
      <Image 
        src="/logos/gemini.png" 
        alt="Gemini Pro" 
        width={256}
        height={256}
        className="w-full h-full object-contain scale-110"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

export function PerplexityIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={className}>
      <Image 
        src="/logos/Perplexity Pro.png" 
        alt="Perplexity Pro" 
        width={256}
        height={256}
        className="w-full h-full object-contain scale-110"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

export function ClaudeIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={className}>
      <Image 
        src="/logos/claude pro.png" 
        alt="Claude Pro" 
        width={256}
        height={256}
        className="w-full h-full object-contain scale-110"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

export function MidjourneyIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mjGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#000000', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#1a1a1a', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#mjGrad)"/>
      <path d="M30 70 Q30 60 40 50 T60 50 Q70 60 70 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M25 40 L50 20 L75 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="35" cy="45" r="3" fill="white"/>
      <circle cx="65" cy="45" r="3" fill="white"/>
    </svg>
  )
}

// ChatGPT GOTO uses same icon as ChatGPT Pro
export function ChatGPTGotoIcon({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={className}>
      <Image 
        src="/logos/Chatgpt Goto.png" 
        alt="ChatGPT GOTO" 
        width={256}
        height={256}
        className="w-full h-full object-contain scale-110"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
