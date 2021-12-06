import type { Component } from 'logicful-templates';

const Template: Component = () => {
  const employees = [
    { name: 'Petra', age: 33, title: 'Chief Template Creator' },
    { name: 'John', age: 31, title: 'Template Hacker' },
    { name: 'Jacky', age: 26, title: 'Senior Template Engineer' },
    { name: 'Boris', age: 28, title: 'Template Acquisition Expert' },
  ];

  return (
    <>
      <html lang='en'>
        <head>
          <title>An example JSX template</title>
          <meta charset='UTF-8' />
          <script type='text/javascript' $innerHTML='alert("An in-your-face message!")' />
        </head>
        <body>
          <div class="employees">
            {employees.map((employee) => (
              <div class='employee'>
                <div class='name'>
                  {employee.name}, {employee.age}
                </div>
                <div class='title'>{employee.title}</div>
              </div>
            ))}
          </div>
        </body>
      </html>
    </>
  );
};

export default Template;
