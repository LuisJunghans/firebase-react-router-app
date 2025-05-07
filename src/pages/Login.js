import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch {
      setError('Usuário não cadastrado ou dados incorretos')
    }
  }

  return (
    <div style={{ maxWidth:400, margin:'auto' }}>
      <h2>Login</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email"    placeholder="E-mail"   value={email}    onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha"    value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Acessar</button>
      </form>
      <p>Não tem conta? <Link to="/">Cadastre-se</Link></p>
    </div>
  )
}
