// import React from 'react';

// function App() {
//   const [state, setState] = React.useState([]);

//   const postData = () => {
//     fetch('http://localhost:8800/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title: valueInput,
//         completed: false,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setState(data);
//       });
//   };

//   const deleteTodo = (id) => {
//     fetch('http://localhost:8800/todos', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setSuccsess(data);
//       });
//   };

//   const changeTodoStatus = ({ completed, id, title }) => {
//     fetch('http://localhost:8800/todos', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id,
//         title,
//         completed: !completed,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setState(data);
//       });
//   };

//   React.useEffect(() => {
//     fetch('http://localhost:8800/')
//       .then((res) => res.json())
//       .then((data) => {
//         setState(data);
//       });
//   }, [succsess]);

//   return (
//     <div className="App">
//       {state.map((item) => (
//         <li>{item}</li>
//       ))}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import MaterialTable from 'material-table';

export default function Table() {
  const [data, setData] = React.useState([]);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'date' },
      { title: 'Phone', field: 'phone', type: 'numeric' },
      { title: 'Email', field: 'email' },
    ],
  });

  const postData = (newData) => {
    debugger;
    fetch('http://localhost:8800/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newData.name,
        surname: newData.surname,
        dateBirth: newData.dateBirth.toUTCString(),
        phone: newData.phone,
        email: newData.email,
      }),
    })
      .then((res) => res.json())
      .then((users) => {
        debugger;
        setState((prevState) => {
          debugger;
          const data = [...prevState.data];
          data.push(users);
          return { ...prevState, data };
        });
      });
  };

  React.useEffect(() => {
    fetch('http://localhost:8800/')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log(data);
  return (
    <MaterialTable
      title="Users management"
      columns={state.columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        pageSize: 10,
        pageSizeOptions: [5, 10],
      }}
      editable={{
        onRowAdd: (newData) =>
          fetch('http://localhost:8800/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              name: newData.name,
              surname: newData.surname,
              birthYear: newData.birthYear,
              phone: newData.phone,
              email: newData.email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setData(data);
            }),
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       if (oldData) {
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data[data.indexOf(oldData)] = newData;
        //           return { ...prevState, data };
        //         });
        //       }
        //     }, 600);
        //   }),
        // onRowDelete: (oldData) =>
        //   // new Promise((resolve) => {
        //   //   setTimeout(() => {
        //   //     resolve();
        //   //     setState((prevState) => {
        //   //       const data = [...prevState.data];
        //   //       data.splice(data.indexOf(oldData), 1);
        //   //       return { ...prevState, data };
        //   //     });
        //   //   }, 600);
        //   fetch('http://localhost:8800/todos', {
        //     method: 'DELETE',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       id: oldData.id,
        //     }),
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       setData((prevState) => {
        //         const data = [...prevState.data];
        //         data.splice(data.indexOf(oldData), 1);
        //         return { ...prevState, data };
        //       });
        //     }),
      }}
    />
  );
}
