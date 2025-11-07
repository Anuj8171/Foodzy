import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();



async function main(){
   
    await prisma.product.createMany({
        data:[
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Snack",
                name: "Fresh organic villa farm lomon 500gm pack",
                price: 28.90,
                image: "http://localhost:5000/images/p1.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "Hodo Foods",
                rating: 4.0,
                type: "Snack",
                name: "Best snakes with hazel nut pack 200gm",
                price: 52.85,
                image: "http://localhost:5000/images/p13.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "StarKist",
                rating: 4.0,
                type: "Snack",
                name: "Organic fresh venila farm watermelon  5kg",
                price: 48.85,
                image: "http://localhost:5000/images/p11.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Vegetables",
                name: "Fresh organic apple 1kg simla marming",
                price: 17.85,
                image: "http://localhost:5000/images/p9.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Pet Foods",
                name: "Blue Diamond Almonds Lightly Salted Vegetables",
                price: 23.90,
                image: "http://localhost:5000/images/p7.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Hodo Foods",
                name: "Chobani Complete Vanilla Greek Yogurt",
                price: 54.85,
                image: "http://localhost:5000/images/p6.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Meats",
                name: "Canada Dry Ginger Ale - 2 L Bottle - 200ml - 400g",
                price: 32.85,
                image: "http://localhost:5000/images/p8.jpg",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Cream",
                name: "Encore Seafoods Stuffed Alaskan Salmon",
                price: 35.85,
                image: "http://localhost:5000/images/p4.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "Old El Paso",
                rating: 4.0,
                type: "Coffes",
                name: "Gorton’s Beer Battered Fish Fillets with soft paper",
                price: 23.85,
                image: "http://localhost:5000/images/p3.png",
                bestSell:false,
                dayDeal: false
            },
            {
                brand: "Tyson",
                rating: 2.0,
                type: "Cream",
                name: "Haagen-Dazs Caramel Cone Ice Cream Ketchup",
                price: 22.85,
                image: "http://localhost:5000/images/p2.png",
                bestSell: false,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Hodo Foods",
                name: "All Natural Italian-Style Chicken Meatballs",
                price: 238.85,
                image: "http://localhost:5000/images/p7.png",
                bestSell: true,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Hodo Foods",
                name: "Angie’s Boomchickapop Sweet and womnies",
                price: 238.85,
                image: "http://localhost:5000/images/p14.png",
                bestSell: true,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Hodo Foods",
                name: "Foster Farms Takeout Crispy Classic",
                price: 238.85,
                image: "http://localhost:5000/images/p12.png",
                bestSell: true,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Hodo Foods",
                name: "Blue Diamond Almonds Lightly Salted",
                price: 238.85,
                image: "http://localhost:5000/images/p10.png",
                bestSell: true,
                dayDeal: false
            },
            {
                brand: "NestFood",
                rating: 4.0,
                type: "Hodo Foods",
                name: "Seeds of Change Organic Quinoa,Brown, & Red Rice",
                price: 32.85,
                image: "http://localhost:5000/images/p4.png",
                bestSell: false,
                dayDeal: true
            },
            {
                brand: "By Old El Paso",
                rating: 4.0,
                type: "Hodo Foods",
                name: "Perdue Simply Smart Organics Gluten Free",
                price: 24.85,
                image: "http://localhost:5000/images/p3.png",
                bestSell: false,
                dayDeal: true
            },
            {
                brand: "Progresso",
                rating: 3.0,
                type: "Hodo Foods",
                name: "Signature Wood-Fired Mushroom and Caramelized",
                price: 12.85,
                image: "http://localhost:5000/images/p2.png",
                bestSell: false,
                dayDeal: true
            },
            {
                brand: "Yoplait",
                rating: 3.0,
                type: "Hodo Foods",
                name: "Simply Lemonade with Raspberry Juice",
                price: 15.85,
                image: "http://localhost:5000/images/p1.png",
                bestSell: false,
                dayDeal: true
            },

            
        ]
    })
    
// await prisma.product.update({
//     where: {
//         id: 7, // Replace with the correct ID of the product
//     },
//     data: {
//         image: "http://localhost:5000/images/p8.jpg",
//     },
// });
//   console.log("✅ Products seeded to DB");

}


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
