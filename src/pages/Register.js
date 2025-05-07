import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [dob, setDob]             = useState('')
  const [error, setError]         = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // cria no Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      // grava no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        email,
        firstName,
        lastName,
        dob
      })
      navigate('/login')  // redireciona para login
    } catch(err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ maxWidth:400, margin:'auto' }}>
      <h2>Cadastro</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email"    placeholder="E-mail"             value={email}       onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha"              value={password}    onChange={e=>setPassword(e.target.value)} required />
        <input type="text"     placeholder="Nome"               value={firstName}   onChange={e=>setFirstName(e.target.value)} required />
        <input type="text"     placeholder="Sobrenome"          value={lastName}    onChange={e=>setLastName(e.target.value)} required />
        <input type="date"     placeholder="Data de Nascimento" value={dob}         onChange={e=>setDob(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem conta? <Link to="/login">Login</Link></p>
    </div>
  )
}
