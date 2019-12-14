const { prompt } = require("inquirer");
const { generate, Card } = require("./templater");
const { Manager, Intern, Engineer } = require("./Employee");

const defaultQs = [
  {
    type: "input",
    name: "name",
    message: "Name",
    validate: input => /^.{2,}/gi.test(input)
  },
  {
    type: "input",
    name: "id",
    message: "ID",
    validate: input => /^.+/gi.test(input)
  },
  {
    type: "input",
    name: "email",
    message: "email",
    validate: input => /^.+@.+\..+$/gi.test(input)
  }
];

const run = async () => {
  console.log("Input Manager Details...");
  const manager = await prompt([
    ...defaultQs,
    {
      type: "input",
      name: "officeID",
      message: "Office Number",
      validate: input => !isNaN(input) && parseInt(input) > 0
    }
  ]);

  const team = [
    new Manager(manager.name, manager.id, manager.email, manager.officeID)
  ];

  for (let adding = true; adding; ) {
    console.log("Input Team Member Detail");
    const { role } = await prompt([
      {
        type: "list",
        choices: ["engineer", "intern"],
        name: "role",
        message: "Member Role"
      }
    ]);

    let member = await prompt([
      ...defaultQs,
      role == "intern"
        ? {
            type: "input",
            name: "school",
            message: "School"
          }
        : {
            type: "inupt",
            name: "github",
            message: "Github Username",
            validate: input => /^.{2,}$/gi.test(input)
          }
    ]);

    team.push(
        role === 'intern' ? new 
    );

    adding = (
      await prompt([
        { type: "confirm", name: "add", message: "Add new team member?" }
      ])
    ).add;
  }

  const cards = (await Promise.all(team.map(m => Card(m)))).join("");

  console.log(await generate({ manager_name: manager.name, cards }));
};

run();
