import { UserLayout } from "../Common/Layouts/UserLayout";
import { useState } from "react";
import "./Suscription.css";
import emailjs from "@emailjs/browser"; 

export const Suscription = ({ gymName = "Nombre del Gimnasio", gymPrice = 200 }) => {
  const [subscriptionType, setSubscriptionType] = useState("mensual");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [price, setPrice] = useState(gymPrice);
  const [isModalOpen, setIsModalOpen] = useState(null); 
  const [email, setEmail] = useState(""); 

  const handleSubscriptionChange = (event) => {
    const selectedType = event.target.value;
    setSubscriptionType(selectedType);
    setPrice(selectedType === "mensual" ? gymPrice : gymPrice * 10);
  };

  const handlePaymentChange = (event) => {
    const selectedPayment = event.target.value;
    setPaymentMethod(selectedPayment);

    if (selectedPayment === "tarjeta" || selectedPayment === "paypal" || selectedPayment === "qr") {
      setIsModalOpen(selectedPayment);
    } else {
      setIsModalOpen(null); 
    }
  };

  const closeModal = () => {
    setIsModalOpen(null);
  };

  const handleConfirmPayment = (method) => {
    closeModal();
    setConfirmationMessage(
      `¡Pago realizado exitosamente con ${method === "tarjeta" ? "tarjeta" : method === "paypal" ? "PayPal" : "QR"}!`
    );
  };

  const handleConfirmSubscription = () => {
    if (!email) {
      setConfirmationMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    
    const templateParams = {
      gym_name: gymName,
      subscription_type: subscriptionType === "mensual" ? "Mensual" : "Anual",
      payment_method: paymentMethod,
      price: price,
      user_email: email,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Correo enviado exitosamente:', response.status, response.text);
        setConfirmationMessage("¡Inscripción completada exitosamente! Se ha enviado una confirmación a tu correo.");
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        setConfirmationMessage("Hubo un error al enviar la confirmación. Por favor, intenta nuevamente.");
      });
  };

  return (
    <UserLayout>
      <section className="subscription-container">
        <h2><i className="fas fa-dumbbell"></i> Inscripción en {gymName}</h2>

        {}
        <div className="form-horizontal">
          {}
          <section id="personalInfo" className="form-section">
            <h3><i className="fas fa-user"></i> Información Personal</h3>
            <div className="form-field">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required />
            </div>

            <div className="form-field">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </section>

          {}
          <section id="subscriptionType" className="form-section">
            <h3><i className="fas fa-calendar-alt"></i> Tipo de Suscripción</h3>
            <div className="radio-group">
              <label className={`radio-option ${subscriptionType === "mensual" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="suscripcion"
                  value="mensual"
                  checked={subscriptionType === "mensual"}
                  onChange={handleSubscriptionChange}
                />
                <i className="fas fa-calendar-day"></i> Mensual - Bs. {gymPrice}/mes
              </label>
              <label className={`radio-option ${subscriptionType === "anual" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="suscripcion"
                  value="anual"
                  checked={subscriptionType === "anual"}
                  onChange={handleSubscriptionChange}
                />
                <i className="fas fa-calendar-check"></i> Anual - Bs. {gymPrice * 10}/año
              </label>
            </div>
          </section>

          {}
          <section id="paymentMethod" className="form-section">
            <h3><i className="fas fa-credit-card"></i> Método de Pago</h3>
            <div className="radio-group">
              <label className={`radio-option ${paymentMethod === "tarjeta" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  checked={paymentMethod === "tarjeta"}
                  onChange={handlePaymentChange}
                />
                <i className="fas fa-credit-card"></i> Tarjeta de Crédito
              </label>
              <label className={`radio-option ${paymentMethod === "paypal" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentChange}
                />
                <i className="fab fa-paypal"></i> PayPal
              </label>
              <label className={`radio-option ${paymentMethod === "qr" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="qr"
                  checked={paymentMethod === "qr"}
                  onChange={handlePaymentChange}
                />
                <i className="fas fa-qrcode"></i> Pago con QR
              </label>
            </div>
          </section>
        </div>

        {}
        <section id="summary" className="form-section summary-section">
          <h3><i className="fas fa-receipt"></i> Resumen de Inscripción</h3>
          <p><strong>Gimnasio:</strong> {gymName}</p>
          <p><strong>Tipo de Suscripción:</strong> {subscriptionType === "mensual" ? "Mensual" : "Anual"}</p>
          <p><strong>Método de Pago:</strong> {paymentMethod}</p>
          <p><strong>Total a Pagar:</strong> Bs. {price}</p>
        </section>

        {}
        <button onClick={handleConfirmSubscription} className="cta-button">
          Confirmar Inscripción
        </button>

        {}
        {confirmationMessage && (
          <p id="confirmationMessage" className="confirmation-message">
            {confirmationMessage}
          </p>
        )}

        {}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {isModalOpen === "tarjeta" && (
                <>
                  <h3>Tarjeta de crédito o débito</h3>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Número de la tarjeta</label>
                    <div className="input-icon">
                      <i className="fas fa-credit-card"></i>
                      <input type="text" id="cardNumber" name="cardNumber" placeholder="Número de la tarjeta" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Fecha de vencimiento</label>
                      <div className="input-icon">
                        <i className="fas fa-calendar-alt"></i>
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="MM / AA" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">Código de seguridad</label>
                      <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <input type="text" id="cvv" name="cvv" placeholder="CVC" required />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">País</label>
                    <div className="input-icon">
                      <i className="fas fa-globe"></i>
                      <select id="country" name="country">
                        <option value="bolivia">Bolivia</option>
                        <option value="argentina">Argentina</option>
                        <option value="chile">Chile</option>
                      </select>
                    </div>
                  </div>
                  <p className="info-text">
                    Para autorizar tu tarjeta, haremos un pequeño cargo que se reembolsará de inmediato. Este sitio está protegido por reCAPTCHA, y se aplican la Política de privacidad y las Condiciones del servicio de Google. Los pagos se procesan de manera internacional. Pueden aplicarse tarifas bancarias adicionales.
                  </p>
                  <div className="modal-buttons">
                    <button onClick={() => handleConfirmPayment("tarjeta")} className="cta-button">Confirmar Pago</button>
                    <button onClick={closeModal} className="cancel-button">Cancelar</button>
                  </div>
                </>
              )}

              {isModalOpen === "paypal" && (
                <>
                  <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal Logo" className="paypal-logo" />
                  <h3>Pagar con PayPal</h3>
                  <p>Ingrese su dirección de correo electrónico para empezar.</p>
                  <input type="email" id="paypalEmail" name="paypalEmail" placeholder="Correo electrónico o número de celular" required className="paypal-input" />
                  <p className="forgot-email"><a href="#">¿Olvidó su correo electrónico?</a></p>
                  <button onClick={() => handleConfirmPayment("paypal")} className="cta-button paypal-button">Siguiente</button>
                </>
              )}

              {isModalOpen === "qr" && (
                <>
                  <h3>Pagar con QR</h3>
                  <p>Escanea el código QR para realizar el pago.</p>
                  <div className="qr-code-placeholder">
                    <img src="https://via.placeholder.com/150" alt="Código QR para pago" />
                  </div>
                  <div className="modal-buttons">
                    <button onClick={() => handleConfirmPayment("qr")} className="cta-button">Confirmar Pago</button>
                    <button onClick={closeModal} className="cancel-button">Cancelar</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </UserLayout>
  );
};
