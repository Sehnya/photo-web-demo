interface BookingData {
  bookingId: string;
  sessionType: string;
  date: string;
  startTime: number;
  endTime: number;
  client: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
  price: number;
}

function formatTime(hour24: number): string {
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h}:00 ${ampm}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateBookingConfirmationEmail(
  booking: BookingData
): Promise<string> {
  // In a real application, you would fetch this from a file or template service
  // For now, we'll return the template with placeholders replaced

  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Shoot is Booked - Branden Adams Photography</title>
    <style>
        /* Reset styles for email clients */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background-color: #000000;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .check-icon {
            width: 80px;
            height: 80px;
            background-color: #10b981;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            font-size: 32px;
        }
        
        .main-title {
            font-size: 36px;
            font-weight: 900;
            margin-bottom: 16px;
            letter-spacing: -0.025em;
        }
        
        .date-time {
            font-size: 20px;
            font-weight: 600;
            color: #10b981;
            margin-bottom: 8px;
        }
        
        .photographer {
            font-size: 16px;
            color: #d1d5db;
        }
        
        .card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 32px;
        }
        
        .card-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
        }
        
        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
        }
        
        .detail-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        
        .detail-label {
            font-size: 12px;
            color: #9ca3af;
            margin-bottom: 4px;
        }
        
        .detail-value {
            font-weight: 600;
            font-size: 14px;
        }
        
        .booking-id-box {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
        }
        
        .booking-id {
            font-family: 'Courier New', monospace;
            font-size: 12px;
        }
        
        .price-box {
            background-color: rgba(16, 185, 129, 0.2);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
        }
        
        .price {
            font-size: 24px;
            font-weight: 700;
            color: #10b981;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
        }
        
        .subsection-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            margin-top: 24px;
        }
        
        .list {
            list-style: none;
            padding: 0;
        }
        
        .list-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .bullet {
            color: #10b981;
            margin-right: 8px;
            font-weight: bold;
        }
        
        .next-steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 32px;
        }
        
        .step-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 24px;
            text-align: center;
        }
        
        .step-emoji {
            font-size: 32px;
            margin-bottom: 12px;
        }
        
        .step-title {
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .step-description {
            font-size: 12px;
            color: #d1d5db;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #ffffff;
            color: #000000;
            font-weight: 600;
            padding: 12px 32px;
            border-radius: 24px;
            text-decoration: none;
            margin: 8px;
        }
        
        .cta-secondary {
            background-color: transparent;
            color: #ffffff;
            border: 1px solid #ffffff;
        }
        
        .contact-box {
            background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            margin-top: 32px;
        }
        
        .contact-title {
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .contact-info {
            font-size: 14px;
            color: #d1d5db;
            margin-bottom: 16px;
        }
        
        .contact-link {
            color: #60a5fa;
            text-decoration: none;
        }
        
        .booking-ref {
            font-size: 12px;
            color: #9ca3af;
        }
        
        /* Mobile responsive */
        @media (max-width: 600px) {
            .main-title {
                font-size: 28px;
            }
            
            .details-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            
            .next-steps {
                grid-template-columns: 1fr;
            }
            
            .card {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="check-icon">✓</div>
            <h1 class="main-title">YOUR SHOOT IS BOOKED</h1>
            <div class="date-time">${formatShortDate(booking.date)} at ${formatTime(booking.startTime)}</div>
            <div class="photographer">with Branden Adams Photography</div>
        </div>

        <!-- Booking Details -->
        <div class="card">
            <h2 class="card-title">
                <span style="color: #60a5fa;">ℹ</span>
                Session Details
            </h2>
            
            <div class="details-grid">
                <div>
                    <div class="detail-item">
                        <span style="color: #a855f7;">📷</span>
                        <div>
                            <div class="detail-label">Session Type</div>
                            <div class="detail-value">${booking.sessionType}</div>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <span style="color: #10b981;">📅</span>
                        <div>
                            <div class="detail-label">Date</div>
                            <div class="detail-value">${formatDate(booking.date)}</div>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <span style="color: #fbbf24;">🕐</span>
                        <div>
                            <div class="detail-label">Time</div>
                            <div class="detail-value">${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}</div>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <span style="color: #ef4444;">📍</span>
                        <div>
                            <div class="detail-label">Location</div>
                            <div class="detail-value">Branden Adams Studio</div>
                            <div style="font-size: 12px; color: #d1d5db;">123 Photography Lane, Creative District</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="detail-item">
                        <span style="color: #60a5fa;">✉</span>
                        <div>
                            <div class="detail-label">Contact</div>
                            <div class="detail-value">${booking.client.name}</div>
                            <div style="font-size: 12px; color: #d1d5db;">${booking.client.email}</div>
                            ${booking.client.phone ? `<div style="font-size: 12px; color: #d1d5db;">${booking.client.phone}</div>` : ""}
                        </div>
                    </div>
                    
                    <div class="booking-id-box">
                        <div class="detail-label">Booking ID</div>
                        <div class="booking-id">${booking.bookingId}</div>
                    </div>
                    
                    <div class="price-box">
                        <div class="detail-label">Session Investment</div>
                        <div class="price">$${booking.price.toLocaleString()}</div>
                        <div style="font-size: 12px; color: #d1d5db; margin-top: 4px;">
                            50% deposit required to secure booking
                        </div>
                    </div>
                </div>
            </div>
            
            ${
              booking.client.notes
                ? `
            <div style="margin-top: 24px; padding: 16px; background-color: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                <div class="detail-label">Special Requests</div>
                <div style="font-size: 14px;">${booking.client.notes}</div>
            </div>
            `
                : ""
            }
        </div>

        <!-- About Your Shoot -->
        <div class="card">
            <h2 class="section-title">About Your Shoot</h2>
            
            <div class="details-grid">
                <div>
                    <h3 class="subsection-title" style="color: #60a5fa;">What to Expect</h3>
                    <ul class="list">
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Professional consultation to understand your vision and goals</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Guided posing and direction throughout the session</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Multiple outfit changes and styling options</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Professional lighting and backdrop setups</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Immediate preview of select images during session</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Post-session gallery review and selection process</span>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="subsection-title" style="color: #a855f7;">Preparation Guidelines</h3>
                    <ul class="list">
                        <li class="list-item">
                            <span class="bullet" style="color: #fbbf24;">•</span>
                            <span>Arrive 15 minutes early for consultation and setup</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet" style="color: #fbbf24;">•</span>
                            <span>Bring 2-3 outfit options in garment bags</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet" style="color: #fbbf24;">•</span>
                            <span>Professional hair and makeup recommended</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet" style="color: #fbbf24;">•</span>
                            <span>Avoid busy patterns; solid colors photograph best</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet" style="color: #fbbf24;">•</span>
                            <span>Bring any props or accessories you'd like to include</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet" style="color: #fbbf24;">•</span>
                            <span>Stay hydrated and get plenty of rest the night before</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Expectations & Code of Conduct -->
        <div class="card">
            <h2 class="section-title">Expectations & Code of Conduct</h2>
            
            <div class="details-grid">
                <div>
                    <h3 class="subsection-title" style="color: #10b981;">Our Commitment to You</h3>
                    <ul class="list">
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Professional, respectful, and comfortable environment</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Clear communication throughout the entire process</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>High-quality images delivered within 2-3 weeks</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Complete privacy and confidentiality of your session</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Flexible rescheduling for weather or emergencies</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Satisfaction guarantee on final image selection</span>
                        </li>
                    </ul>
                    
                    <h3 class="subsection-title" style="color: #60a5fa;">Session Policies</h3>
                    <ul class="list">
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Sessions start promptly at scheduled time</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>50% deposit required to secure booking</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>48-hour cancellation policy for full refund</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Weather-related rescheduling is always complimentary</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Additional time can be purchased during session if needed</span>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="subsection-title" style="color: #ef4444;">Professional Standards</h3>
                    <ul class="list">
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Maintain professional boundaries at all times</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Respectful communication and behavior expected</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>No inappropriate requests or conduct will be tolerated</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Studio is a safe, inclusive space for all clients</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Alcohol or substances are not permitted during sessions</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Guests are welcome but must not interfere with session</span>
                        </li>
                    </ul>
                    
                    <h3 class="subsection-title" style="color: #a855f7;">Image Rights & Usage</h3>
                    <ul class="list">
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>You retain full rights to your images</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>High-resolution files included with all packages</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Print release provided for personal use</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Commercial usage rights available upon request</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Portfolio usage requires written consent</span>
                        </li>
                        <li class="list-item">
                            <span class="bullet">•</span>
                            <span>Social media sharing guidelines will be provided</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Next Steps -->
        <div style="text-align: center;">
            <h2 class="section-title">Next Steps</h2>
            <div class="next-steps">
                <div class="step-card">
                    <div class="step-emoji">💳</div>
                    <h3 class="step-title">1. Secure Your Booking</h3>
                    <p class="step-description">Pay your 50% deposit to confirm your session date and time.</p>
                </div>
                <div class="step-card">
                    <div class="step-emoji">📧</div>
                    <h3 class="step-title">2. Preparation Email</h3>
                    <p class="step-description">You'll receive detailed preparation guidelines 48 hours before your session.</p>
                </div>
                <div class="step-card">
                    <div class="step-emoji">📸</div>
                    <h3 class="step-title">3. Your Session</h3>
                    <p class="step-description">Arrive ready to create amazing images that you'll treasure forever.</p>
                </div>
            </div>
            
            <div style="margin: 32px 0;">
                <a href="${process.env.PAYMENT_LINK || "#/checkout"}" class="cta-button">
                    Pay Deposit Now ($${(booking.price / 2).toLocaleString()})
                </a>
                <a href="${process.env.BOOKING_LINK || "#/schedule"}" class="cta-button cta-secondary">
                    Book Another Session
                </a>
            </div>
            
            <div class="contact-box">
                <h3 class="contact-title">Questions or Need to Make Changes?</h3>
                <p class="contact-info">
                    Contact us at <a href="mailto:hello@brandenadams.com" class="contact-link">hello@brandenadams.com</a> or 
                    <a href="tel:+1234567890" class="contact-link">(123) 456-7890</a>
                </p>
                <p class="booking-ref">
                    Booking ID: ${booking.bookingId} • Please reference this ID in all communications
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;

  return template;
}

export function sendBookingConfirmationEmail(
  booking: BookingData
): Promise<boolean> {
  // In a real application, this would integrate with an email service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP

  return new Promise((resolve) => {
    // Simulate email sending
    console.log("Sending booking confirmation email to:", booking.client.email);
    console.log("Booking ID:", booking.bookingId);

    // Generate the email HTML
    generateBookingConfirmationEmail(booking)
      .then((emailHtml) => {
        // In a real app, you would send this HTML via your email service
        console.log("Email HTML generated successfully");

        // For demo purposes, we'll just log success
        // You could also open the email in a new window for testing:
        // const newWindow = window.open();
        // newWindow?.document.write(emailHtml);

        resolve(true);
      })
      .catch((error) => {
        console.error("Error generating email:", error);
        resolve(false);
      });
  });
}

// Example usage function for testing
export function previewBookingEmail(booking: BookingData): void {
  generateBookingConfirmationEmail(booking).then((emailHtml) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(emailHtml);
      newWindow.document.close();
    }
  });
}
