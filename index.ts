#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let toDoList: string[] = [];
let condition = true;
console.log(chalk.rgb(255, 4, 255).bold("              <======================================================>"))
console.log(chalk.rgb(9, 255, 182).bold("\n \t<================ Welcome to Todo-List Application ================>\n"));
console.log(chalk.rgb(255, 4, 255).bold("              <======================================================>\n"));

let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.rgb(255, 213, 71).bold("Select an option you want to do:"),
        choices: [
          "Add Task",
          "Remove Task",
          "View Todo-List",
          "Update To-do List",
          "Exit",
        ],
      },
    ]);
    /* "Add Task" */
    if (option.choice === "Add Task") {
      await addTask()
     } 
     /* "Remove Task" */
     else if (option.choice === "Remove Task") {
      await removeTask()
    } 
    /* "Update Todo-List" */
    else if (option.choice === "Update To-do List") {
      await updateTask()
    } 
    /* "View Todo-List" */
    else if (option.choice === "View Todo-List") {
      await viewTask()
    }
      /* "Exit" */
     else if (option.choice === "Exit") {
      condition = false;
      console.log(
        chalk
          .rgb(255, 4, 255)
          .bold(
            "\n \t<================ thanks for using the App Good Bye ================>\n"
          )
      );
    }
  }
};

//*Function to add new task to the list *//
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "firstQuestion",
      type: "input",
      message: chalk.cyan("What would you like to add in you todos?"),
      validate: function (value) {
        if (value.trim() !== "") {
          return true;
        }
        return chalk.bgBlueBright("Please enter a valid task");
      },
    },
  ]);
  toDoList.push(newTask.firstQuestion);
  console.log(
    chalk.greenBright.bold(`\n${newTask.firstQuestion} Task added in Todo-List successfully`)
  );
};
//*Fuction to view all ToDo List Tasks *//
let viewTask = () => {
  console.log(chalk.yellow.bold("\n Your Todo-List: \n"));
  toDoList.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};

//*Function to remove a task from the list
let removeTask = async () => {
  await viewTask();
  let taskindex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Please enter the index number of the task you wish to remove:",
    },
  ]);
  let removeTask = toDoList.splice(taskindex.index, 1);
  console.log(
    chalk.redBright(`\n${removeTask} has been successfully deleted from your To-do List .`)
  );
};

//*Function to update a task
let updateTask = async () => {
  await viewTask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.yellow.bold("Enter the 'index no' of the task you want to update :"),
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.cyan("Now Enter new task name :"),
    },
  ]);
  toDoList[update_task_index.index] = update_task_index.new_task
  console.log( chalk.greenBright.bold(
    `\n Task at index no. ${update_task_index.index} updated successfully [For updated list Check option: "View Todo-List"] `)
  )
}

main();
