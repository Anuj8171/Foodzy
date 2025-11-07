import { Request, Response } from "express";
import prisma from "../prisma/client";
import sgMail from "@sendgrid/mail";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not set in environment variables`);
  }
  return value;
}

export const allproducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const productById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const order = async (req: Request, res: Response) => {

  try {
    

    const {
      email,
      items,
      total,
      paymentMethod,
      firstName,
      lastName,
      address,
      city,
      postCode,
      country,
      regionState,
    } = req.body;

    // Validate required fields
    if (
      !email ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !total ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !postCode ||
      !country ||
      !regionState
    ) {
      return res.status(400).json({ message: "Missing or invalid order details" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ 
        message: "Email not verified. Please verify OTP first." 
      });
    }

    // Create order
    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        items,
        total,
        paymentMethod: paymentMethod || "Cash On Delivery",
        firstName,
        lastName,
        address,
        city,
        postCode,
        country,
        regionState,
      },
    });

    // Prepare email content
    const itemList = items
      .map(
        (item: any) =>
          `• ${item.name} — ${item.qty} × $${Number(item.price).toFixed(2)}`
      )
      .join("\n");

    const mailText = `
Hello ${firstName},

🎉 Your order has been placed successfully!

Order ID: #${newOrder.id}

🧾 Order Details:
${itemList}

💰 Total Amount: $${Number(total).toFixed(2)}
💳 Payment Method: ${paymentMethod || "Cash On Delivery"}

📦 Shipping Address:
${firstName} ${lastName}
${address}, ${city}, ${regionState}, ${country} - ${postCode}

Thank you for shopping with us!
- Foodzy Team
    `.trim();

    const mailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Order Confirmed! 🎉</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #333;">Hello <strong>${firstName}</strong>,</p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #333;">Thank you for your order! We're excited to get your items to you.</p>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; color: #666;">Order ID: <strong>#${newOrder.id}</strong></p>
              </div>

              <!-- Order Items -->
              <h3 style="margin: 20px 0 15px; color: #333; font-size: 18px;">🧾 Order Details</h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e0e0e0; font-size: 14px; color: #666;">Item</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #e0e0e0; font-size: 14px; color: #666;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e0e0e0; font-size: 14px; color: #666;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${items
                    .map(
                      (item: any) => `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333;">${item.name}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333; text-align: center;">${item.qty}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333; text-align: right;">$${Number(item.price).toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                  <tr>
                    <td colspan="2" style="padding: 15px 10px; font-size: 16px; font-weight: bold; color: #333;">Total Amount</td>
                    <td style="padding: 15px 10px; font-size: 18px; font-weight: bold; color: #667eea; text-align: right;">$${Number(total).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Payment Method -->
              <div style="margin-top: 20px; padding: 15px; background-color: #f0f7ff; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #333;">💳 <strong>Payment Method:</strong> ${paymentMethod || "Cash On Delivery"}</p>
              </div>

              <!-- Shipping Address -->
              <h3 style="margin: 25px 0 15px; color: #333; font-size: 18px;">📦 Shipping Address</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px;">
                <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.6;">
                  <strong>${firstName} ${lastName}</strong><br/>
                  ${address}<br/>
                  ${city}, ${regionState}<br/>
                  ${country} - ${postCode}
                </p>
              </div>

              <p style="margin: 25px 0 0; font-size: 14px; color: #666; line-height: 1.6;">
                We'll send you a shipping confirmation email as soon as your order ships.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #333; font-weight: bold;">Thank you for shopping with Foodzy! 🍕</p>
              <p style="margin: 0; font-size: 12px; color: #999;">This is an automated email, please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // Send email via SendGrid
    const sendgridKey = requireEnv("SENDGRID_API_KEY");
    const senderEmail = requireEnv("SENDGRID_SENDER");

    sgMail.setApiKey(sendgridKey);

    const msg = {
      to: user.email,
      from: {
        email: senderEmail,
        name: "Foodzy",
      },
      subject: `Order Confirmation #${newOrder.id} - Foodzy`,
      text: mailText,
      html: mailHtml,
      headers: {
        "X-Order-ID": newOrder.id.toString(),
      },
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
      },
    };

    try {
      const [response] = await sgMail.send(msg);
      console.log("✅ Order Confirmation Email Sent:", {
        to: user.email,
        orderId: newOrder.id,
        statusCode: response.statusCode,
        messageId: response.headers["x-message-id"],
      });

      return res.json({
        message: "Order placed successfully! Confirmation email sent.",
        order: newOrder,
      });
    } catch (emailError: any) {
      console.error("❌ Failed to send order confirmation email:", {
        error: emailError.message,
        response: emailError.response?.body,
      });

      // Order was created successfully, but email failed
      return res.status(201).json({
        message: "Order placed successfully, but confirmation email failed to send.",
        order: newOrder,
        warning: "Please check your orders page for details.",
      });
    }
  } catch (error) {
    console.error("❌ Error placing order:", error);
    return res.status(500).json({ message: "Failed to place order" });
  }
};