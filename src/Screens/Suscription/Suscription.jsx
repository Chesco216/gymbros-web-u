import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { UserLayout } from "../Common/Layouts/UserLayout"
import { useParams } from 'react-router-dom'
import { useUser } from "../../store/useUser"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase/firebasse"

export const Suscription = () => {

  const params = useParams()
  const user = useUser(state => state.user)
  const [cardNumber, setCardNumber] = useState('')
  const navigate = useNavigate()

  const formatCardNumber = ( value ) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const handlePayment = async(e) => {
    e.preventDefault()
    try {
      const usr = await setDoc(doc(db, 'user', user.uid), {
        ...user,
        id_gym: params.id
      })
      toast.success('Inscrito correctamente', {
        duration: 2500
      })
      navigate('/profile')
      console.log(({usr}))
    } catch (error) {
      alert(error.code)
    }
  }

  return (
    <UserLayout>
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Información de Pago</h2>
          <p className="text-gray-600 text-sm mb-6">Ingresa los detalles de tu tarjeta para procesar el pago</p>
          <form className="space-y-4"
            onSubmit={(e) => handlePayment(e)}
          >
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Tarjeta
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  id="cardNumber"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Expiración
                </label>
                <input
                  required
                  type="text"
                  id="expDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM / AA"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  required
                  type="text"
                  id="cvv"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre en la Tarjeta
              </label>
              <input
                required
                type="text"
                id="cardName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Juan Pérez"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Pagar Ahora
            </button>
          </form>
        </div>
      </div>
      <Toaster/>
    </UserLayout>
  )
}
