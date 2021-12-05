// next.js example: https://github.com/vercel/next.js/blob/canary/examples/auth0/lib/user.js

import { useState, useEffect } from 'react'
import Cookie from 'js-cookie';

export async function fetchUser(token) {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user
  }

  if (!token){
	  delete window.__user
	  return null
  }

  const res = await fetch(
    '/api/user',
    token
      ? {
          headers: {
            token,
          },
        }
      : {}
  )

  if (!res.ok) {
    delete window.__user
    return null
  }

  const json = await res.json()
  
  if (typeof window !== 'undefined') {
    window.__user = json
  }
  return json
}

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  )
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return window.__user || null
  })

  const token = Cookie.get('token')

  useEffect(
    () => {
      if (!loading && user) {
        return
      }
      setLoading(true)
      let isMounted = true

      fetchUser(token).then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = '/api/login'
            return
          }
          setUser(user)
          setLoading(false)
        }
      })

      return () => {
        isMounted = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { user, token, loading}
}