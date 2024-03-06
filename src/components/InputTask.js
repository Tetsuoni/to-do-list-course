import { Select, Input, Button, Grid, Header, Icon } from "semantic-ui-react";
import { useState } from "react";
import { v4 as uuidv4} from 'uuid';
const options = [
  { key: "deporte", text: "Deporte", value: "deporte" },
  { key: "casa", text: "Casa", value: "casa" },
  { key: "oficina", text: "Oficina", value: "oficina" },
  { key: "otra", text: "Otra", value: "otra" },
];

export default function InputTask(props) {
  const [task, setTask] = useState({
    idTask: "",
    taskName: "",
    categoryTask: "",
  });

  const [error, setError] = useState(false);

const { createTask } = props;

  const onChangeTask = (e) => {
    //e -> valor predefinido que viene desde  onChange
    //..task -> esto hace una copia, le decimos básicamente que lo que tenía la tarea lo vamos a seguir cogiendo y lo vamos a guardar
    //[e.target.name]: e.target.value -> actualizamos valor de name con valor de value
    setTask({
      ...task, 
      [e.target.name]: e.target.value, 
    });
  };

  const onChangeCategoryTask = (e, data) => {
    setTask({
      ...task,
      [data.name]: data.value,
    });
  };

  const onSubmitTask = (e) => {
    //que no recarguela página
    e.preventDefault();

    //validación (no items vacíos)
    //trim para quitar espacios
    if (task.taskName.trim() === "") {
      setError(true);
      return;
    }

    //eliminar mensaje previo
    setError(false);

    //asignar un ID
    task.idTask =uuidv4();

    //crear task
    createTask(task);

    //limpiar inputs
    setTask({
        idTask: "",
        taskName: "",
        categoryTask: "",
    });


  };
  return (
    <>
      <Grid centered columns={2}>
        <Input type="text" action>
          <Input
            size="small"
            icon="add"
            placeholder="Escribe tu tarea..."
            iconPosition="left"
            name="taskName"
            value={task.taskName}
            onChange={onChangeTask}
          />
          <Select
            compact
            options={options}
            className="select-form-task"
            name="categoryTask"
            placeholder="categoria"
            value={task.categoryTask}
            onChange={onChangeCategoryTask}
          />
          <Button type="submit" color="violet" onClick={onSubmitTask}>
            Añadir tarea
          </Button>
        </Input>
      </Grid>
      <Grid>
        {error && (
          <Grid centered>
            <Header as="h4" color="red" className="alert-error-form">
              <Icon name="close" />
              <Header.Content>La tarea es obligatoria</Header.Content>
              <Icon name="close" />
            </Header>
          </Grid>
        )}
      </Grid>
    </>
  );
}
