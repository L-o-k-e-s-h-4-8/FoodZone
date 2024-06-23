const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const multer = require("multer");
const Stripe = require("stripe");
const uuid = require("uuid");
const stripe = new Stripe(
  "sk_test_51PSCruP9PyRPVS6P5Np7s4X6ya4wKuDDBbMedFbwWYaMIuDtpLmR4H9BWDngJXV5MDbUNB57ynsbICCXpbYjm9pI00fATA2b6S"
);
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "restaurants",
  password: "root",
  port: 5432,
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.use("/images", express.static("uploads"));
const PORT = 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Zone API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./server.js"],
};

//Swagger API Documentation
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 *  components:
 *    schema:
 *      Food:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *      Upload:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          price:
 *            type: string
 *          category:
 *            type: string
 *          email:
 *            type: string
 *
 *      Register:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          userType:
 *            type: string
 *
 *      Restaurant:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          address:
 *            type: string
 *          pincode:
 *            type: string
 *          contact:
 *            type: string
 *          email:
 *            type: string
 */

/**
 * @swagger
 * /userorders:
 *  get:
 *    summary: Retrive all the orders which have been placed
 *    description: Retrive all the orders which have been placed
 *    responses:
 *      200:
 *        description: To get orders data
 * /list:{email}:
 *  get:
 *    summary: Retrive the menu data for the specified restaurant by email
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        description:  Email Id Required
 *    responses:
 *      200:
 *        description: Used to get menu data for specified email
 *
 * /list:
 *  get:
 *    summary: Retrive all the menu data
 *    responses:
 *      200:
 *        description: Used to get all the menu data
 * /login:
 *  get:
 *    summary: Retrive all the user login detials
 *    responses:
 *      200:
 *        description: Used to get login data
 *
 * /restaurant:
 *  get:
 *    summary: Retrive all the restaurants details
 *    responses:
 *      200:
 *        description: Restaurants details
 *
 * /checkout:
 *  post:
 *    summary: Post order details along with payment status
 *    responses:
 *      200:
 *        description: Post order details along with payment status
 *
 * /userorders/status:
 *  post:
 *    summary: Udpadting the user order status by orderId
 *    responses:
 *      200:
 *        description: updating user order status
 *
 * /upload:
 *  post:
 *    summary: upload menu
 *    responses:
 *      200:
 *        description: upload menu
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schema/Upload'
 *
 * /remove:
 *  post:
 *    summary: remove menu by menuId
 *    responses:
 *      200:
 *        description: remove menu by menuId
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schema/Food'
 *
 * /register:
 *  post:
 *    summary: register data into user database
 *    responses:
 *      200:
 *        description: register data into user database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schema/Register'
 *
 * /register/restaurant:
 *  post:
 *    summary: register restaurant data
 *    responses:
 *      200:
 *        description: register restaurant data
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schema/Restaurant'
 */

//Stripe Payment Integration
app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const { items, delivery } = req.body;
  const frontend_url = "http://localhost:5173";
  orderId_data = uuid.v4();
  try {
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    pool.query(
      `insert into order_data (orderid,menudata,street,pincode,city,state,contact,payment,email,order_status,restaurant_name) values('${orderId_data}','${JSON.stringify(
        items
      )}','${delivery.street}','${delivery.pincode}','${delivery.city}','${
        delivery.state
      }','${delivery.contact}','${delivery.payment}','${
        delivery.email
      }','processing','${delivery.restaurant_name}')`
    );

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${orderId_data}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId_data}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

app.post("/verify", async (req, res) => {
  const { success, orderId } = req.body;
  console.log(req.body);
  try {
    if (success == "true") {
      await pool.query(
        `update order_data set payment='true' where orderid='${orderId}'`
      );
      res.json({ success: true, message: "Paid" });
    } else {
      await pool.query(`delete from order_data where orderid='${orderId}'`);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

app.get("/userorders", (req, res) => {
  pool.query(`select * from order_data`, (err, result) => {
    res.json(result["rows"]);
  });
});

app.post("/userorders/status", (req, res) => {
  console.log(req.body);
  try {
    pool.query(
      `update order_data set order_status ='${req.body.order_status}' where orderid='${req.body.orderId}'`
    );
    res.json({ success: true, message: "Status Updated" });
  } catch {
    res.json({ status: false, message: "Error" });
  }
});

// Admin Pannel
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const { name, description, price, category, email } = req.body;
  console.log(req.body);
  const image_filename = `${req.file.filename}`;
  console.log(image_filename);
  pool
    .query(
      `insert into menu_data (name,description,price,category,image,email) values('${name}','${description}','${price}','${category}','${image_filename}','${email}')`
    )
    .then(() => {
      return res.json({ success: true, message: "Food Added Successfully" });
    });
});

app.get("/list:email", (req, res) => {
  let email = "";
  email += req.params.email.slice(1);
  pool.query(
    `select * from menu_data  where email = '${email}'`,
    (err, result) => {
      res.json({
        success: true,
        message: "Data Received",
        data: result["rows"],
      });
    }
  );
});

app.post("/list/update", (req, res) => {
  const { id, name, description, price, category } = req.body;
  pool
    .query(
      `update menu_data set name = '${name}',description = '${description}' ,price = ${price}, category = '${category}' where id = ${id}`
    )
    .then(() => {
      res.json({ success: true });
    });
});

app.get("/list", (req, res) => {
  pool.query(`select * from menu_data`, (err, result) => {
    res.json({
      success: true,
      message: "Data Received",
      data: result["rows"],
    });
  });
});

app.post("/remove", (req, res) => {
  const id = Number(req.body.menu_id);
  console.log(id);
  pool.query(`delete from menu_data where id = ${id}`).then(() => {
    res.json({ success: true, message: "Menu Removed !" });
  });
});

// To register User
app.post("/register", (req, res) => {
  const { name, email, password, userType } = req.body;

  pool.query(
    `INSERT INTO data (name,email, password,userType) VALUES ('${name}', '${email}','${password}','${userType}')`
  );
  res.send("Data added to Database !");
});

app.post("/register/restaurant", (req, res) => {
  const { name, address, pincode, contact, email } = req.body;

  pool.query(
    `INSERT INTO restaurants (restaurant_name,restaurant_address, pincode,contact,email) VALUES ('${name}', '${address}','${pincode}','${contact}','${email}')`
  );
  res.send("Data added to Database !");
});

app.get("/login", (req, res) => {
  pool.query("select * from data", (err, results) => {
    res.send(results["rows"]);
  });
});

app.get("/restaurant", (req, res) => {
  pool.query("select * from restaurants", (err, results) => {
    res.json(results["rows"]);
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening at port :${PORT}`);
});
