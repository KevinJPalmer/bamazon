var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Palmer94!",
  database: "bamazon2_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  displayForCustomer();
});

//Display db using a table from npm pack cli-table2
// See if Customer would want to purchase item and how many
var displayForCustomer = function () {
  // var display = new displayTable();
  connection.query("Select * from products", function (err, results) {
    if (err) throw err;
    // display.displayIventoryTable(results);
    console.log(results);
    purchaseItem();
  });

}

var purchaseItem = function () {
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: " Enter the id of the item you want to buy",
  },{
    name: "quantity",
    type: "input",
    message: " Enter the amount you want to purchase",
  }])
  .then(function (answer) {
    // Query the DB for info on item and quantity
    connection.query("Select product_name, department_name, price, stock_quantity from products where item_id = ?", [ answer.id ]
      , function (err, res) {
          if (err) throw err;

          if (res[0].stock_quantity >= answer.quantity) {
            //If enough inventory to complete order, process order by updating database inventory and notifying customer that order is complete.
            var itemQuantity = res[0].stock_quantity - answer.quantity;
            var itemPrice = res[0].price;
            connection.query("UPDATE products SET ? WHERE ?",
              [
                { stock_quantity: itemQuantity},
                { item_id: answer.id}
              ],
              function(err, res) {
                //notify user after db is updated
                if (err) throw err;
                console.log(res);
                var cost = itemPrice * answer.quantity;
                console.log('\n  Order fulfilled! Your cost is $' + cost.toFixed(2) + '\n');
                // Order completed
                customerPrompt();
              }
            );
          } else {
            //If not enought inventory notify customer and prompt customer for desire to shop more
            console.log('\n  Sorry, Insufficient quantity to fulfill your order!\n');
            // Order not completed
            customerPrompt();
          }
      }
    )
  });
}


var customerPrompt = function () {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: " Would like to continue shopping?\n",
    choices: ["Yes", "No"]
  })
  .then(function (answer) {
    switch (answer.action) {
      case 'Yes':
        displayForCustomer();
        break;
      case 'No':
        connection.end();
        break;
    }
  })
};
