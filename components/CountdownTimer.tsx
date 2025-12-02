'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endTime: Date
  className?: string
}

export default function CountdownTimer({ endTime, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const distance = end - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      <span className="text-red-500 font-semibold">⏰ Offer ends in:</span>
      <div className="flex gap-1">
        {timeLeft.days > 0 && (
          <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded font-bold">
            {timeLeft.days}d
          </span>
        )}
        <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded font-bold">
          {String(timeLeft.hours).padStart(2, '0')}h
        </span>
        <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded font-bold">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </span>
        <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded font-bold">
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    </div>
  )
}
