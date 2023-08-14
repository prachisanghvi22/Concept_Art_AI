import { create } from 'zustand'

interface UserProps {
    userDetails: any
    setUserDetails: (userDetails: any) => void
    isSupabaseUserReady: boolean
    setIsSupabaseUserReady: (isSupabaseUserReady: boolean) => void
}

const useSupabaseUser  = create<UserProps>()(
      (set) => ({
        userDetails: null,
        setUserDetails: (userDetails) => set({userDetails:userDetails}),
        isSupabaseUserReady: false,
        setIsSupabaseUserReady: (isSupabaseUserReady) => set({isSupabaseUserReady: isSupabaseUserReady})
      })
)

export default useSupabaseUser;