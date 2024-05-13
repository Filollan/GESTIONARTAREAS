<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand mx-auto font-weight-bold title" href="/">Hábitos</a>
    </nav>
    <div class="container">
      <!-- Tabla para agregar tareas -->
      <div class="row pt-5">
        <div class="col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" class="form-control" placeholder="Escriba la tarea">
                </div>
                <div class="form-group">
                  <input type="text" v-model="task.hour" class="form-control" placeholder="Escriba la hora">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" cols="30" rows="10" placeholder="Escriba la descripción" class="form-control"></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary" style="margin-top: 10px;">Enviar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary" style="margin-top: 10px;">Editar</button>
                </template>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Tabla para mostrar las tareas -->
      <div class="row pt-6 mt-5">
        <div class="col-md-7 mx-auto">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th> </th>
                <th>Hora</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks" :key="task._id">
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Eliminar</button>
                  <button @click="editTask(task._id)" class="btn btn-primary">Editar</button>
                </td>
                <td>{{ task.hour }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.status }}</td>
                <td>
                  <button @click="changeTaskStatus(task._id, 'No realizada')" class="btn btn-secondary">No realizado</button>
                  <button @click="changeTaskStatus(task._id, 'En progreso')" class="btn btn-warning">En progreso</button>
                  <button @click="changeTaskStatus(task._id, 'Completado')" class="btn btn-success">Completado</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title = '', description = '', hour = '', status = 'No realizado') {
    this.title = title;
    this.description = description;
    this.hour = hour;
    this.status = status; 
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: ''
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    sendTask() {
  if (this.edit === false) {
    fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(this.task),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.getTasks();
        this.task = new Task();
      });
  } else {
    fetch('/api/tasks/' + this.taskToEdit, {
      method: 'PUT',
      body: JSON.stringify(this.task), // Corregir aquí para enviar los datos actualizados
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.getTasks();
        this.task = new Task();
        this.edit = !this.edit;
      });
  }
},
    getTasks() {
  fetch('/api/tasks')
    .then(res => res.json())
    .then(data => {
      this.tasks = data;
      // Establecer el estado predeterminado como 'No Realizado' para todas las tareas
      this.tasks.forEach(task => {
        task.status = 'No Realizado';
      });
    });
},
    deleteTask(taskId) {
      fetch('/api/tasks/' + taskId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
    },
    editTask(taskId) {
  fetch('/api/tasks/' + taskId)
    .then(res => res.json())
    .then(data => {
      const { _id, title, description, hour, status } = data;
      // Establecer los datos de la tarea antes de entrar en modo de edición
      this.task.title = title;
      this.task.description = description;
      this.task.hour = hour;
      this.task.status = status;
      this.taskToEdit = _id;
      this.edit = true;
    });
},
    changeTaskStatus(taskId, status) {
      // Método para cambiar el estado de la tarea
      const task = this.tasks.find(task => task._id === taskId);
      if (task) {
        task.status = status; // Actualizar el estado
        // Lógica para enviar el cambio al servidor, si es necesario
      }
    }
  }
}
</script>
<style>

</style>
