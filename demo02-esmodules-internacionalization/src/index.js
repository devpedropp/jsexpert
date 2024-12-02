import database from "./../database.json" assert { type: "json" }
import chalk from "chalk";
import chalkTable from "chalk-table";
import DraftLog from "draftlog";
import readline from "readline";
import Person from "./person.js";

DraftLog(console).addLineListener(process.stdin);

const DEFAULT_LANG = "pt-BR";

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.white("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.red("Km Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.green("To") },
    ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)));
const print = console.draft(table);

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

terminal.question("Qual é o seu nome?", msg => {
    console.log("msg", msg.toString())
});