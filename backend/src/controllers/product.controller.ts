import { Request, Response } from "express";
import prisma from "../prisma/client";
import nodemailer from "nodemailer";
export const allproducts = async (_req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({});
        res.json(products);

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
    
}


export const productById = async(req: Request, res: Response)=>{
     try {
        const id = Number(req.params.id);
        const product = await prisma.product.findUnique({where : {id}})
        if (!product) {
        return res.status(404).json({ message: "Product not found" });
        }
        res.json(product)
     } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Failed to fetch product" });
     }
}

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

    // Validate input
    if (
      !email ||
      !items ||
      !total ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !postCode ||
      !country ||
      !regionState
    ) {
      return res.status(400).json({ message: "Missing order details" });
    }

    // ✅ Check if user exists (OTP verified earlier)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email not verified. Please verify OTP first." });
    }

    // ✅ Create new order
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

    // ✅ Prepare email content
    const itemList = items
      .map(
        (item: any) => `• ${item.name} — ${item.qty} × $${item.price.toFixed(2)}`
      )
      .join("\n");

    const mailBody = `
Hello ${firstName},

🎉 Your order has been placed successfully!

🧾 Order Details:
${itemList}

💰 Total Amount: $${total.toFixed(2)}
💳 Payment Method: ${paymentMethod || "Cash On Delivery"}

📦 Shipping Address:
${firstName} ${lastName}
${address}, ${city}, ${regionState}, ${country} - ${postCode}

Thank you for shopping with us!
- The NestFood Team
    `;

    // ✅ Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Order Confirmation - NestFood",
      text: mailBody,
    });

    return res.json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Failed to place order" });
  }
};
