import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (!user) return navigate('/login')
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) setUserData(snap.data())
    })
    return unsub
  }, [navigate])

  if (!userData) return <p>Carregando...</p>

  return (
    <div style={{ maxWidth:400, margin:'auto' }}>
      <h2>Bem-vindo, {userData.firstName} {userData.lastName}</h2>
      <p>Data de Nascimento: {userData.dob}</p>
      <button onClick={async () => { await signOut(auth); navigate('/login') }}>Logout</button>
    </div>
  )
}
