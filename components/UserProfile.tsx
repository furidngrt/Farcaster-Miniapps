'use client'

import { useEffect, useState } from 'react'

interface UserProfileProps {
  context: any
}

export default function UserProfile({ context }: UserProfileProps) {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!context?.user?.fid) return

      try {
        const response = await fetch(`/api/user?fid=${context.user.fid}`)
        const data = await response.json()
        setUserData(data.user)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [context])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>👤</span> Your Profile
      </h2>
      
      {userData ? (
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          <img
            src={userData.pfp_url}
            alt={userData.display_name}
            className="w-16 h-16 rounded-full border-2 border-farcaster-purple"
          />
          
          {/* User Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">
              {userData.display_name}
            </h3>
            <p className="text-gray-600">@{userData.username}</p>
            <p className="text-sm text-gray-500 mt-1">FID: {userData.fid}</p>
            
            {/* Stats */}
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <div className="font-bold text-farcaster-purple">
                  {userData.follower_count?.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-farcaster-purple">
                  {userData.following_count?.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Following</div>
              </div>
              {userData.power_badge && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
                  <span className="text-sm">⚡</span>
                  <span className="text-xs font-semibold text-purple-700">Power User</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">
          Unable to load profile data
        </div>
      )}
    </div>
  )
}

