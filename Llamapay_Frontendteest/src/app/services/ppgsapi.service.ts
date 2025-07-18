import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js'; // Asegúrate de instalar @stripe/stripe-js
@Injectable({
  providedIn: 'root'
})
export class PpgsApiService {
  private stripePromise = loadStripe('pk_test_51Rga8gQOZgL1362OXerpR1WXVrxBfHU1tamjFl6Lvy4u5KHXbWjRHUg5q02ETkEcYcu7v05phA1gnWRjkgQn3hBW0055Gb3fFo'); // tu clave pública de Stripe

  constructor() {}

  async redirectToCheckout(): Promise<void> {
    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe.js no se cargó correctamente');
      return;
    }

    // Crea una sesión rápida para simular el flujo de pago
    await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1RgaOQQOZgL1362OlJor8XjF', // reemplaza por un ID de precio de tu Stripe
          quantity: 1,
        }
      ],
      mode: 'payment',
      successUrl: 'http://localhost:4200/success',
      cancelUrl: 'http://localhost:4200/cancel',
    });
  }
}
