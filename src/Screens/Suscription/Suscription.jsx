import { UserLayout } from "../Common/Layouts/UserLayout"

export const Suscription = () => {
	return (
		<UserLayout>

			<section className="w-full flex flex-col justify-center mt-24 items-center">
				<form className="px-2 py-4 flex gap-3 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-7xl flex-col" method="POST">
					<fieldset className="flex flex-col gap-2">
						<legend className="h1 mb-5">Choose your preferred payment method:</legend>
						<div className="payment-method">

							<input type="radio" id="debit-card" name="payment-method" value="debit" checked />
							<label htmlFor="debit-card">Tarjeta de Debito</label>
						</div>


						<div className="payment-method">
							<input type="radio" id="paypal" name="payment-method" value="paypal" checked />
							<label htmlFor="paypal">PayPal</label>
						</div>


						<div className="payment-method">
							<input type="radio" id="qr" name="payment-method" value="qr" />
							<label htmlFor="qr">Codigo QR</label>
						</div>
					</fieldset>

					<button type="submit">Continue</button>
				</form>
			</section>
		</UserLayout >
	)
}
