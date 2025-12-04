import { GoogleGenAI } from "@google/genai";
import { Restaurant } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// Helper to generate realistic looking food images based on the name
const getFoodImage = (name: string) => {
  const encodedName = encodeURIComponent(name + " food high quality delicious close up");
  return `https://image.pollinations.ai/prompt/${encodedName}?width=400&height=400&nologo=true&seed=${Math.random()}`;
};

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  // Simulating an API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    {
      id: "supreme",
      name: "Supreme Restaurant",
      cuisine: "Biryani, Chinese, Desserts",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      hasOffer: true, // Only this restaurant has the main offer badge
      // Specific image provided by user
      image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzy89eP46p3g82FQ6faq7Xf7Z8yjLR71Apff5y9smbYIU7eDp-AuQUb6ybmZBZFgV4acpypHTsDFVYXhtfkiW4ENa-sS9f7Vb2TEdXNyfC9yjUSVtSyQiz1SYZpoYwe7vXdXV3O=s1360-w1360-h1020-rw",
      address: "Main Road, Venkatagiri",
      menu: [
        // RICE / BIRYANI - Selective offers applied here
        { id: "s1", name: "Chicken Dum Biryani", description: "Classic Hyderabadi style dum biryani", price: 200, originalPrice: 250, isVeg: false, category: "Biryani" },
        { id: "s2", name: "Family Pack Chicken Dum Biriyani", description: "Serves 3-4 people (Super Saver)", price: 500, originalPrice: 1000, isVeg: false, category: "Biryani" }, // 50% OFF
        { id: "s3", name: "Chicken Fry Piece Biryani", description: "Spicy fried chicken with aromatic rice", price: 220, isVeg: false, category: "Biryani" },
        { id: "s4", name: "Chicken Moghalai Biryani", description: "Rich and creamy chicken biryani", price: 220, isVeg: false, category: "Biryani" },
        { id: "s5", name: "Chicken Dilkush Biryani", description: "Specialty biryani with nuts and fruits", price: 250, isVeg: false, category: "Biryani" },
        { id: "s6", name: "Chicken Lollipop Biryani", description: "Biryani served with juicy chicken lollipops", price: 250, isVeg: false, category: "Biryani" },
        { id: "s7", name: "Mutton Dum Biryani", description: "Tender mutton pieces cooked with basmati rice", price: 320, originalPrice: 400, isVeg: false, category: "Biryani" },
        { id: "s8", name: "Family Pack Mutton Dum Biriyani", description: "Serves 3-4 people (Best Value)", price: 800, originalPrice: 1600, isVeg: false, category: "Biryani" }, // 50% OFF
        { id: "s9", name: "Mutton Fry Pieces Biryani", description: "Spicy mutton fry with biryani rice", price: 350, isVeg: false, category: "Biryani" },
        { id: "s10", name: "Prawn Biryani", description: "Flavorful prawn masala mixed with rice", price: 370, isVeg: false, category: "Biryani" },
        { id: "s11", name: "Veg Biryani", description: "Assorted vegetables cooked with aromatic spices", price: 160, isVeg: true, category: "Biryani" },
        { id: "s12", name: "Mushroom Biryani", description: "Spicy mushroom masala rice", price: 100, isVeg: true, category: "Biryani" },
        { id: "s13", name: "Paneer Biryani", description: "Soft paneer cubes in biryani rice", price: 200, isVeg: true, category: "Biryani" },

        // FRIED RICE
        { id: "s14", name: "Chicken Fried Rice", description: "Wok tossed rice with chicken and veggies", price: 170, isVeg: false, category: "Fried Rice" },
        { id: "s15", name: "Sea Food Fried Rice", description: "Mixed seafood fried rice", price: 180, isVeg: false, category: "Fried Rice" },
        { id: "s16", name: "Egg Fried Rice", description: "Classic egg fried rice", price: 140, isVeg: false, category: "Fried Rice" },
        { id: "s17", name: "Mixed Non Veg Fried Rice", description: "Chicken, Mutton, Egg mix", price: 200, isVeg: false, category: "Fried Rice" },
        { id: "s18", name: "Hongkong Chicken Fried Rice", description: "Sweet and spicy flavor", price: 100, isVeg: false, category: "Fried Rice" },
        { id: "s19", name: "Mexican Chicken Fried Rice", description: "Spicy Mexican style", price: 180, isVeg: false, category: "Fried Rice" },
        { id: "s20", name: "Veg Fried Rice", description: "Fresh vegetables tossed with rice", price: 140, isVeg: true, category: "Fried Rice" },
        { id: "s21", name: "Gobi Fried Rice", description: "Fried rice with crispy cauliflower", price: 150, isVeg: true, category: "Fried Rice" },
        { id: "s22", name: "Paneer Fried Rice", description: "Fried rice with cottage cheese", price: 170, isVeg: true, category: "Fried Rice" },
        { id: "s23", name: "Mushroom Fried Rice", description: "Fried rice with mushrooms", price: 170, isVeg: true, category: "Fried Rice" },
        { id: "s24", name: "Mix Veg Fried Rice", description: "All veggies mix", price: 100, isVeg: true, category: "Fried Rice" },
        { id: "s25", name: "Jeera Rice", description: "Cumin flavored rice", price: 150, isVeg: true, category: "Fried Rice" },
        { id: "s26", name: "Plain Rice", description: "Steamed white rice", price: 60, isVeg: true, category: "Rice Specials" },
        { id: "s27", name: "Curd Rice", description: "Cool yogurt rice", price: 80, isVeg: true, category: "Rice Specials" },
        { id: "s28", name: "Special Curd Rice", description: "Tadkawala curd rice with fruits", price: 120, isVeg: true, category: "Rice Specials" },

        // DESSERTS & ICE CREAMS
        { id: "s29", name: "Strawberry Ice Cream", description: "Classic berry flavor", price: 90, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s30", name: "Butter Scotch/Pista Ice Cream", description: "Crunchy delight", price: 100, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s31", name: "Chocolate/Mango Ice Cream", description: "Rich and creamy", price: 100, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s32", name: "Caramel/Raj Bhog Ice Cream", description: "Royal flavors", price: 120, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s33", name: "Black Currant Ice Cream", description: "Berry blast", price: 110, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s34", name: "Gulab Jamun with Ice Cream", description: "Hot jamun with cold vanilla", price: 100, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s35", name: "Nutty Gritty (2 Scoops)", description: "Loaded with nuts", price: 150, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s36", name: "Titanic (3 Scoops)", description: "Massive sundae", price: 180, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s37", name: "Rainbow", description: "Colorful mixed flavors", price: 200, isVeg: true, category: "Desserts & Ice Creams" },
        { id: "s38", name: "Supreme Fish (6 Scoops)", description: "Family size ice cream platter", price: 240, isVeg: true, category: "Desserts & Ice Creams" },

        // MILK SHAKES
        { id: "s39", name: "Vanilla/Strawberry Shake", description: "Classic shakes", price: 120, isVeg: true, category: "Milk Shakes" },
        { id: "s40", name: "Butter Scotch/Pista Shake", description: "Nutty shakes", price: 130, isVeg: true, category: "Milk Shakes" },
        { id: "s41", name: "Chocolate/Mango Shake", description: "Rich shakes", price: 130, isVeg: true, category: "Milk Shakes" },
        { id: "s42", name: "Caramel/Raj Bhog Shake", description: "Premium shakes", price: 150, isVeg: true, category: "Milk Shakes" },
        { id: "s43", name: "Black Currant Shake", description: "Berry shake", price: 140, isVeg: true, category: "Milk Shakes" },

        // MOCKTAILS & BEVERAGES
        { id: "s44", name: "GD Mocktail", description: "House special", price: 80, isVeg: true, category: "Mocktails" },
        { id: "s45", name: "Blue Angel", description: "Blue curacao mocktail", price: 100, isVeg: true, category: "Mocktails" },
        { id: "s46", name: "White Mojito", description: "Mint and lime refresher", price: 100, isVeg: true, category: "Mocktails" },
        { id: "s47", name: "Kiwi Spicy Mojito", description: "Tangy and spicy", price: 100, isVeg: true, category: "Mocktails" },
        { id: "s48", name: "Fresh Lime Soda", description: "Sweet or Salt", price: 50, isVeg: true, category: "Beverages" },
        { id: "s49", name: "Sweet Lassi", description: "Thick yogurt drink", price: 50, isVeg: true, category: "Beverages" },
        { id: "s50", name: "Butter Milk", description: "Plain or Masala", price: 40, isVeg: true, category: "Beverages" },
        { id: "s51", name: "Water Bottle", description: "Mineral water", price: 20, isVeg: true, category: "Beverages" },
        { id: "s52", name: "Soft Drinks", description: "Cool drinks", price: 20, isVeg: true, category: "Beverages" },
      ]
    },
    {
      id: "mamas",
      name: "Mama's Kitchen",
      cuisine: "Andhra, Biryani, Fast Food",
      rating: 4.3,
      deliveryTime: "30-35 mins",
      hasOffer: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2v4uCNBas4MkSfuPb-W4lqDn_bfphPMUX0A&s",
      address: "Teachers Colony / Venkatagiri Bazar",
      menu: [
        // RICE / BIRYANI
        { id: "m1", name: "Chicken Dum Biryani", description: "Spicy Andhra style", price: 150, isVeg: false, category: "Biryani" },
        { id: "m2", name: "Family Pack Chicken Dum Biryani", description: "Large portion", price: 400, isVeg: false, category: "Biryani" },
        { id: "m3", name: "Chicken Fry Pieces Biryani", description: "With crispy fry pieces", price: 150, isVeg: false, category: "Biryani" },
        { id: "m4", name: "Chicken Moghalai Biryani", description: "Rich gravy biryani", price: 150, isVeg: false, category: "Biryani" },
        { id: "m5", name: "Chicken Dilkush Biryani", description: "Specialty biryani", price: 170, isVeg: false, category: "Biryani" },
        { id: "m6", name: "Chicken Lollipop Biryani", description: "Served with lollipops", price: 170, isVeg: false, category: "Biryani" },
        { id: "m7", name: "Mutton Dum Biryani", description: "Traditional mutton biryani", price: 230, isVeg: false, category: "Biryani" },
        { id: "m8", name: "Family Pack Mutton Dum Biryani", description: "For the whole family", price: 650, isVeg: false, category: "Biryani" },
        { id: "m9", name: "Mutton Fry Pieces Biryani", description: "Spicy mutton fry", price: 250, isVeg: false, category: "Biryani" },
        { id: "m10", name: "Prawn Biryani", description: "Tasty prawn rice", price: 270, isVeg: false, category: "Biryani" },
        { id: "m11", name: "Veg Biryani", description: "Garden fresh veg biryani", price: 110, isVeg: true, category: "Biryani" },
        { id: "m12", name: "Mushroom Biryani", description: "Spicy mushroom rice", price: 70, isVeg: true, category: "Biryani" },
        { id: "m13", name: "Paneer Biryani", description: "Cottage cheese biryani", price: 150, isVeg: true, category: "Biryani" },
        
        // FRIED RICE
        { id: "m14", name: "Chicken Fried Rice", description: "Classic street style", price: 120, isVeg: false, category: "Fried Rice" },
        { id: "m15", name: "Sea Food Fried Rice", description: "Mixed seafood", price: 130, isVeg: false, category: "Fried Rice" },
        { id: "m16", name: "Egg Fried Rice", description: "Scrambled egg rice", price: 100, isVeg: false, category: "Fried Rice" },
        { id: "m17", name: "Mixed Non-Veg Fried Rice", description: "Special mix", price: 150, isVeg: false, category: "Fried Rice" },
        { id: "m18", name: "Hongkong Chicken Fried Rice", description: "Specialty rice", price: 70, isVeg: false, category: "Fried Rice" },
        { id: "m19", name: "Mexican Chicken Fried Rice", description: "Spicy Mexican", price: 130, isVeg: false, category: "Fried Rice" },
        { id: "m20", name: "Veg Fried Rice", description: "Simple and tasty", price: 110, isVeg: true, category: "Fried Rice" },
        { id: "m21", name: "Gobi Fried Rice", description: "Cauliflower rice", price: 110, isVeg: true, category: "Fried Rice" },
        { id: "m22", name: "Paneer Fried Rice", description: "Paneer rice", price: 120, isVeg: true, category: "Fried Rice" },
        { id: "m23", name: "Mushroom Fried Rice", description: "Mushroom rice", price: 120, isVeg: true, category: "Fried Rice" },
        { id: "m24", name: "Mix Veg Fried Rice", description: "Mixed vegetables", price: 70, isVeg: true, category: "Fried Rice" },
        { id: "m25", name: "Jeera Rice", description: "Cumin rice", price: 110, isVeg: true, category: "Fried Rice" },
        { id: "m26", name: "Plain Rice", description: "White rice", price: 60, isVeg: true, category: "Fried Rice" },
        { id: "m27", name: "Special Curd Rice", description: "Seasoned yogurt rice", price: 80, isVeg: true, category: "Fried Rice" },

        // DESSERTS & SHAKES
        { id: "m28", name: "Strawberry Ice Cream", description: "Fruit flavor", price: 60, isVeg: true, category: "Desserts" },
        { id: "m29", name: "Butter Scotch / Pista", description: "Nutty flavor", price: 70, isVeg: true, category: "Desserts" },
        { id: "m30", name: "Chocolate / Mango", description: "Rich flavor", price: 70, isVeg: true, category: "Desserts" },
        { id: "m31", name: "Caramel / Raj Bhog", description: "Premium", price: 80, isVeg: true, category: "Desserts" },
        { id: "m32", name: "Black Currant", description: "Berry", price: 80, isVeg: true, category: "Desserts" },
        { id: "m33", name: "Gulab Jamun with Ice Cream", description: "Hot & Cold combo", price: 70, isVeg: true, category: "Desserts" },
        { id: "m34", name: "Nutty Gritty (2 Scoops)", description: "Double scoop joy", price: 110, isVeg: true, category: "Desserts" },
        { id: "m35", name: "Titanic (3 Scoops)", description: "Triple scoop", price: 130, isVeg: true, category: "Desserts" },
        { id: "m36", name: "Rainbow", description: "Mixed colors", price: 150, isVeg: true, category: "Desserts" },
        { id: "m37", name: "Supreme Fish (16 Scoops)", description: "Party pack", price: 180, isVeg: true, category: "Desserts" },
        
        { id: "m38", name: "Vanilla / Strawberry Shake", description: "Cool shake", price: 90, isVeg: true, category: "Milkshakes" },
        { id: "m39", name: "Butter Scotch / Pista Shake", description: "Nutty shake", price: 100, isVeg: true, category: "Milkshakes" },
        { id: "m40", name: "Chocolate / Mango Shake", description: "Fruit/Cocoa", price: 100, isVeg: true, category: "Milkshakes" },
        { id: "m41", name: "Caramel / Raj Bhog Shake", description: "Premium shake", price: 110, isVeg: true, category: "Milkshakes" },
        { id: "m42", name: "Black Currant Shake", description: "Berry shake", price: 110, isVeg: true, category: "Milkshakes" },

        // BEVERAGES
        { id: "m43", name: "GD Mocktail", description: "House special", price: 80, isVeg: true, category: "Mocktails" },
        { id: "m44", name: "Blue Angel", description: "Blue curacao", price: 70, isVeg: true, category: "Mocktails" },
        { id: "m45", name: "White Mojito", description: "Mint lime", price: 70, isVeg: true, category: "Mocktails" },
        { id: "m46", name: "Kiwi Spicy Mojito", description: "Spicy kiwi", price: 70, isVeg: true, category: "Mocktails" },
        { id: "m47", name: "Fresh Lime Soda", description: "Refreshing drink", price: 35, isVeg: true, category: "Beverages" },
        { id: "m48", name: "Sweet Lassi", description: "Chilled yogurt drink", price: 35, isVeg: true, category: "Beverages" },
        { id: "m49", name: "Buttermilk", description: "Spiced or Plain", price: 25, isVeg: true, category: "Beverages" },
        { id: "m50", name: "Water Bottle", description: "Mineral Water", price: 20, isVeg: true, category: "Beverages" },
        { id: "m51", name: "Soft Drinks", description: "Cola/Orange", price: 20, isVeg: true, category: "Beverages" }
      ]
    },
    {
      id: "lassi",
      name: "Lassi Shop",
      cuisine: "Beverages, Desserts, Fast Food",
      rating: 4.6,
      deliveryTime: "15-20 mins",
      hasOffer: false,
      image: "https://content.jdmagicbox.com/comp/nellore/y4/9999px861.x861.220419235429.m7y4/catalogue/lassi-shop-trunk-road-nellore-lassi-shops-JwWrTyFnlO.jpg",
      address: "Near Market, Venkatagiri",
      menu: [
        // SUPER SHAKES
        { id: "l1", name: "Body Cooler", description: "Refreshing shake", price: 60, isVeg: true, category: "Super Shakes" },
        { id: "l2", name: "Chocolate Fudge", description: "Chocolatey goodness", price: 70, isVeg: true, category: "Super Shakes" },
        { id: "l3", name: "Belgian Chocolate", description: "Premium chocolate", price: 70, isVeg: true, category: "Super Shakes" },
        { id: "l4", name: "Mexican Brownie", description: "Spiced brownie shake", price: 70, isVeg: true, category: "Super Shakes" },
        { id: "l5", name: "Ferrero Automatic", description: "Hazelnut treat", price: 60, isVeg: true, category: "Super Shakes" },
        { id: "l6", name: "Peanut Butter", description: "Creamy peanut", price: 80, isVeg: true, category: "Super Shakes" },
        { id: "l7", name: "Oreo Shake", description: "Cookies and cream", price: 50, isVeg: true, category: "Super Shakes" },
        { id: "l8", name: "Whey Protein", description: "Protein boost", price: 90, isVeg: true, category: "Super Shakes" },

        // SUNDAES & NUTELLA
        { id: "l9", name: "Mississippi Mud", description: "Rich chocolate sundae", price: 100, isVeg: true, category: "Super Sundae" },
        { id: "l10", name: "Coconut Sundae", description: "Tropical delight", price: 110, isVeg: true, category: "Super Sundae" },
        { id: "l11", name: "Dry Fruit Sundae", description: "Nutty overload", price: 110, isVeg: true, category: "Super Sundae" },
        { id: "l12", name: "Nutella Fudge", description: "Hazelnut fudge", price: 110, isVeg: true, category: "Nutella/Hazelnut" },
        { id: "l13", name: "Nutella Brownie", description: "Brownie with Nutella", price: 150, isVeg: true, category: "Nutella/Hazelnut" },
        { id: "l14", name: "Nutella Lychees", description: "Exotic combo", price: 150, isVeg: true, category: "Nutella/Hazelnut" },

        // ICE CREAM SCOOPS
        { id: "l15", name: "Black Forest", description: "Cherry chocolate", price: 90, isVeg: true, category: "Ice Cream Scoop" },
        { id: "l16", name: "Dry Fruit Dream", description: "Loaded with nuts", price: 90, isVeg: true, category: "Ice Cream Scoop" },
        { id: "l17", name: "Caramel Nut", description: "Sweet and salty", price: 90, isVeg: true, category: "Ice Cream Scoop" },
        { id: "l18", name: "Green Pista", description: "Pistachio", price: 90, isVeg: true, category: "Ice Cream Scoop" },
        { id: "l19", name: "Oreo", description: "Cookie crumble", price: 90, isVeg: true, category: "Ice Cream Scoop" },

        // ICE CREAM SUNDAES & FALOODA
        { id: "l20", name: "ABC Sundae", description: "Special sundae", price: 60, isVeg: true, category: "Ice Cream Sundaes" },
        { id: "l21", name: "Falooda", description: "Classic dessert drink", price: 90, isVeg: true, category: "Ice Cream Sundaes" },
        { id: "l22", name: "Kesar Falooda", description: "Saffron flavored", price: 90, isVeg: true, category: "Ice Cream Sundaes" },
        { id: "l23", name: "Kulfi Falooda", description: "Traditional kulfi", price: 90, isVeg: true, category: "Ice Cream Sundaes" },

        // FRUITS & CREAM
        { id: "l24", name: "Fruit Salad Ice Cream", description: "Fresh fruits", price: 60, isVeg: true, category: "Fruits & Cream" },
        { id: "l25", name: "Lychee Salad", description: "Sweet lychees", price: 130, isVeg: true, category: "Fruits & Cream" },

        // LASSI
        { id: "l26", name: "Sweet Lassi", description: "Classic yogurt drink", price: 40, isVeg: true, category: "Lassi" },
        { id: "l27", name: "Fruit Lassi", description: "Fruity yogurt", price: 50, isVeg: true, category: "Lassi" },
        { id: "l28", name: "Mango Lassi", description: "Mango flavored", price: 50, isVeg: true, category: "Lassi" },
        { id: "l29", name: "Saffron Lassi", description: "Kesar flavored", price: 60, isVeg: true, category: "Lassi" },
        { id: "l30", name: "Dry Fruit Lassi", description: "Rich and thick", price: 70, isVeg: true, category: "Lassi" },

        // COLD COFFEE & MOJITO
        { id: "l31", name: "Hard Rock Coffee", description: "Strong cold coffee", price: 50, isVeg: true, category: "Cold Coffee" },
        { id: "l32", name: "Mud Coffee", description: "Thick chocolate coffee", price: 100, isVeg: true, category: "Cold Coffee" },
        { id: "l33", name: "Blue Lime Mojito", description: "Blue curacao", price: 70, isVeg: true, category: "Mojito" },
        { id: "l34", name: "Mango Mango Mojito", description: "Mango refresher", price: 50, isVeg: true, category: "Mojito" },
        { id: "l35", name: "Blueberry Mojito", description: "Berry refresher", price: 70, isVeg: true, category: "Mojito" },
        { id: "l36", name: "Tropical Mix Fruit", description: "Mixed fruit juice", price: 70, isVeg: true, category: "Mojito" },
        { id: "l37", name: "Passion Fruit", description: "Exotic fruit", price: 70, isVeg: true, category: "Mojito" },

        // FOOD
        { id: "l38", name: "Veg Pizza", description: "Garden fresh", price: 120, isVeg: true, category: "Pizza" },
        { id: "l39", name: "Veg Cheese Pizza", description: "Cheesy delight", price: 140, isVeg: true, category: "Pizza" },
        { id: "l40", name: "Corn Pizza", description: "Sweet corn topping", price: 160, isVeg: true, category: "Pizza" },
        { id: "l41", name: "Chicken Cheese Pizza", description: "Loaded with chicken", price: 200, isVeg: false, category: "Pizza" },
        { id: "l42", name: "Veg Sandwich", description: "Simple veg", price: 80, isVeg: true, category: "Sandwich" },
        { id: "l43", name: "Veg Cheese Sandwich", description: "Grilled cheese", price: 90, isVeg: true, category: "Sandwich" },
        { id: "l44", name: "Chicken Sandwich", description: "Chicken filling", price: 110, isVeg: false, category: "Sandwich" },
        { id: "l45", name: "Chicken Cheese Sandwich", description: "Cheesy chicken", price: 130, isVeg: false, category: "Sandwich" },
        { id: "l46", name: "Veg Momos", description: "Steamed", price: 90, isVeg: true, category: "Momos" },
        { id: "l47", name: "Veg Fried Momos", description: "Crispy", price: 100, isVeg: true, category: "Momos" },
        { id: "l48", name: "Paneer Momos", description: "Cottage cheese", price: 110, isVeg: true, category: "Momos" },
        { id: "l49", name: "Chicken Momos", description: "Steamed chicken", price: 120, isVeg: false, category: "Momos" },
        { id: "l50", name: "Chicken Fried Momos", description: "Fried chicken dumplings", price: 130, isVeg: false, category: "Momos" }
      ]
    },
    {
      id: "ramesh",
      name: "Ramesh Family Dabha",
      cuisine: "North Indian, Curry, Starters",
      rating: 4.2,
      deliveryTime: "35-45 mins",
      hasOffer: false,
      image: "https://content3.jdmagicbox.com/comp/khammam/j5/9999p8742.8742.210417124842.a5j5/catalogue/ramesh-family-dhaba-warangal-cross-road-khammam-restaurants-p17wjdaomh.jpg",
      address: "Opp. HP Petrol Bunk, Tirupathi Road",
      menu: [
        // NON VEG STARTERS
        { id: "r1", name: "Chicken Leg Piece", description: "Fried leg piece", price: 90, isVeg: false, category: "Non Veg Starters" },
        { id: "r2", name: "Chilli Chicken", description: "Spicy Indo-Chinese", price: 230, isVeg: false, category: "Non Veg Starters" },
        { id: "r3", name: "Chicken 65", description: "Deep fried boneless", price: 230, isVeg: false, category: "Non Veg Starters" },
        { id: "r4", name: "Chicken Manchuria", description: "Tangy balls", price: 230, isVeg: false, category: "Non Veg Starters" },
        { id: "r5", name: "Pepper Chicken", description: "Black pepper spice", price: 270, isVeg: false, category: "Non Veg Starters" },
        { id: "r6", name: "Chicken Lollipop Fry", description: "Kids favorite", price: 280, isVeg: false, category: "Non Veg Starters" },
        { id: "r7", name: "Chicken Lollipop Roast", description: "Roasted lollipops", price: 270, isVeg: false, category: "Non Veg Starters" },
        { id: "r8", name: "Chicken Lollipop Half Fry/Roast", description: "Half portion", price: 150, isVeg: false, category: "Non Veg Starters" },
        { id: "r9", name: "Chicken Majestic", description: "Creamy spicy strips", price: 280, isVeg: false, category: "Non Veg Starters" },
        { id: "r10", name: "Chicken Star", description: "Star shaped chicken", price: 280, isVeg: false, category: "Non Veg Starters" },
        { id: "r11", name: "Shangrilla Chicken", description: "Exotic starter", price: 300, isVeg: false, category: "Non Veg Starters" },
        { id: "r12", name: "Ramesh Dabha Special", description: "Chef special starter", price: 300, isVeg: false, category: "Non Veg Starters" },
        { id: "r13", name: "Chicken Bone Fry", description: "Crunchy bone fry", price: 220, isVeg: false, category: "Non Veg Starters" },
        { id: "r14", name: "Chicken Bone Roast", description: "Roasted bone chicken", price: 230, isVeg: false, category: "Non Veg Starters" },
        { id: "r15", name: "Tiger Chicken Bone", description: "Spicy bone preparation", price: 260, isVeg: false, category: "Non Veg Starters" },
        { id: "r16", name: "Natukodi Fry", description: "Country chicken fry", price: 280, isVeg: false, category: "Non Veg Starters" },

        // SPECIAL NON VEG
        { id: "r17", name: "Chicken Maharani", description: "Royal rich curry", price: 300, isVeg: false, category: "Special Non Veg" },
        { id: "r18", name: "Mutton Fry", description: "Dry mutton roast", price: 300, isVeg: false, category: "Special Non Veg" },
        { id: "r19", name: "Mutton Curry", description: "Traditional curry", price: 280, isVeg: false, category: "Special Non Veg" },
        { id: "r20", name: "Mutton Head Fry", description: "Head meat fry", price: 300, isVeg: false, category: "Special Non Veg" },
        { id: "r21", name: "Mutton Head Curry", description: "Head meat gravy", price: 280, isVeg: false, category: "Special Non Veg" },
        { id: "r22", name: "Boti Fry", description: "Intestine fry", price: 200, isVeg: false, category: "Special Non Veg" },
        { id: "r23", name: "Boti Curry", description: "Intestine gravy", price: 200, isVeg: false, category: "Special Non Veg" },

        // NON VEG CURRIES
        { id: "r24", name: "Leg Piece Curry", description: "Curry with leg piece", price: 200, isVeg: false, category: "Non Veg Curries" },
        { id: "r25", name: "Chicken Boneless Curry", description: "Easy to eat curry", price: 220, isVeg: false, category: "Non Veg Curries" },
        { id: "r26", name: "Chicken Mogalai Bone", description: "Rich gravy with bone", price: 250, isVeg: false, category: "Non Veg Curries" },
        { id: "r27", name: "Chicken Bone Kadai", description: "Wok cooked bone chicken", price: 270, isVeg: false, category: "Non Veg Curries" },
        { id: "r28", name: "Butter Chicken", description: "Sweet creamy tomato", price: 270, isVeg: false, category: "Non Veg Curries" },
        { id: "r29", name: "Ginger Chicken", description: "Ginger flavored", price: 270, isVeg: false, category: "Non Veg Curries" },
        { id: "r30", name: "Chicken Punjabi", description: "Robust spicy gravy", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r31", name: "Chicken Mogalai", description: "Egg and cream based", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r32", name: "Chicken Ramba", description: "Specialty curry", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r33", name: "Chicken Hyderabadi", description: "Spicy green gravy", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r34", name: "Chicken Kadai", description: "Capsicum and onions", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r35", name: "Chicken Dilkush", description: "Fruits and nuts curry", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r36", name: "Kaju Chicken", description: "Cashew nut curry", price: 260, isVeg: false, category: "Non Veg Curries" },
        { id: "r37", name: "Chicken Lollipop Curry", description: "Gravy with lollipops", price: 280, isVeg: false, category: "Non Veg Curries" },
        { id: "r38", name: "Ramesh Dhaba Special Curry", description: "Chef's secret recipe", price: 300, isVeg: false, category: "Non Veg Curries" }
      ]
    },
    {
      id: "pvmess",
      name: "PV Mess",
      cuisine: "South Indian Meals",
      rating: 4.7,
      deliveryTime: "20-25 mins",
      hasOffer: false,
      image: "https://content.jdmagicbox.com/comp/nellore/f5/9999px861.x861.230201224121.b3f5/catalogue/pv-mess-nellore-restaurants-cm6aenan0s.jpg",
      address: "Bazar Street, Venkatagiri",
      menu: [
        { id: "p1", name: "Full Meals (with Yoghurt)", description: "Complete meal with rice, dal, sambar, rasam, curries, yogurt", price: 80, isVeg: true, category: "Meals" },
        { id: "p2", name: "Plate Meals", description: "Standard rice plate with sides", price: 60, isVeg: true, category: "Meals" },
        { id: "p3", name: "Plate Meals (with yogurt)", description: "Standard plate with curd", price: 70, isVeg: true, category: "Meals" },
        { id: "p4", name: "Full Meals Parcel", description: "Takeaway full pack", price: 130, isVeg: true, category: "Parcels" },
        { id: "p5", name: "Half Meals Parcel", description: "Takeaway mini pack", price: 85, isVeg: true, category: "Parcels" },
        { id: "p6", name: "Curd Rice", description: "Cool curd rice", price: 40, isVeg: true, category: "Rice" },
        { id: "p7", name: "Curd Parcel", description: "Curd rice takeaway", price: 20, isVeg: true, category: "Parcels" },
        { id: "p8", name: "Sambar (250g)", description: "Extra sambar packet", price: 20, isVeg: true, category: "Extras" },
        { id: "p9", name: "Rasam (250g)", description: "Extra rasam packet", price: 20, isVeg: true, category: "Extras" },
        { id: "p10", name: "Curries Set", description: "Daily vegetable curries", price: 30, isVeg: true, category: "Extras" }
      ]
    }
  ];
};

export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What is the approximate address or area name for these coordinates: ${lat}, ${lng}? Return only a short address string (e.g. "Main Road, Venkatagiri").`,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });

    return response.text || "Venkatagiri (Detected Location)";
  } catch (error) {
    console.error("Failed to reverse geocode:", error);
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};