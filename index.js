'use strict';

const fs = require('fs');
const inquirer = require('inquirer');

const suppliesData = JSON.parse(fs.readFileSync('./data.json'));

const supplies = Object.keys(suppliesData);

const chooseSupplyPrompt = {
  type: 'list',
  name: 'choice',
  message: 'Enter supply:',
  choices: supplies
};

const continueShoppingPrompt = {
  type: 'list',
  name: 'choice',
  message: 'Would you like to continue shopping?',
  choices: ['Yes', 'No']
};

const chooseSupplyTypePrompt = (supplyType) => ({
  type: 'list',
  name: 'choice',
  message: 'Enter supply type:',
  choices: Object.keys(suppliesData[supplyType])
});

const enterQuantityPrompt = {
  type: 'input',
  name: 'input',
  message: 'Enter quantity',
};

let bill = 0;

function billMaker(supply, supplyType, quantity, suppliesData) {
  // console.log(supply + '\n' + supplyType + '\n' + quantity + '\n');
  bill += suppliesData[supplyType][supply].price * quantity;
  console.log('Your current bill is:' + bill);
  // console.log(supplies);
}

function chooseSupply() {
  inquirer.prompt(chooseSupplyPrompt).then(answers => {
    chooseSupplyType(answers.choice);
  });
}

function chooseSupplyType(supplyType) {
  inquirer.prompt(chooseSupplyTypePrompt(supplyType)).then(answers => {
    enterQuantity(supplyType, answers.choice);
  });
}

function enterQuantity(supplyType, supply) {
  inquirer.prompt(enterQuantityPrompt).then(answers => {
    const quantity = answers.input;
    billMaker(supply, supplyType, quantity, suppliesData);
    continueShopping();
  });
}

function continueShopping() {
  inquirer.prompt(continueShoppingPrompt).then(answers => {
    if (answers.choice === 'Yes') chooseSupply();
    totalBill();
    return;
  });
}

function totalBill() {
  console.log('Your total bill is: ' + bill);
}


console.log('Welcome to supplies shop "DIMAS from Troeschina"');
chooseSupply();
