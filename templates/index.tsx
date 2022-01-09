import type { FunctionComponent } from 'react';

const Template: FunctionComponent = () => {
  const employees = [
    { name: 'Petra', age: 33, title: 'Chief Template Creator' },
    { name: 'John', age: 31, title: 'Template Hacker' },
    { name: 'Jacky', age: 26, title: 'Senior Template Engineer' },
    { name: 'Boris', age: 28, title: 'Template Acquisition Expert' },
  ];

  return (
    <html lang='en'>
      <head>
        <title>An example JSX template</title>
        <meta charSet='UTF-8' />
        <script type='text/javascript' dangerouslySetInnerHTML={{ __html: 'alert("An in-your-face message!")' }} />
      </head>
      <body>
        <div className='employees'>
          {employees.map((employee) => (
            <div key={employee.name} className='employee'>
              <div className='name'>
                {employee.name}, {employee.age}
              </div>
              <div className='title'>{employee.title}</div>
            </div>
          ))}
        </div>
      </body>
    </html>
  );
};

export default Template;
