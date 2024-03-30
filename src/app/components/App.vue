<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <h1 class="text-center mb-4">Gestión de Tareas</h1>
        <div class="card shadow-sm">
          <div class="card-body">
            <form @submit.prevent="sendTask">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Título</label>
                <input type="text" id="title" v-model="task.title" class="form-control" placeholder="Escriba la tarea" required>
              </div>
              <div class="form-group">
                <label for="description" class="font-weight-bold">Descripción</label>
                <textarea id="description" v-model="task.description" rows="5" class="form-control" placeholder="Escriba la descripción" required></textarea>
              </div>
              <div class="mt-3">
                <template v-if="edit === false">
                  <button type="submit" class="btn btn-primary btn-block">Guardar</button>
                </template>
                <template v-else>
                  <button type="submit" class="btn btn-success btn-block">Editar</button>
                </template>
              </div>
            </form>
          </div>
        </div>
        <div class="card shadow-sm mt-4">
          <div class="card-body">
            <h5 class="card-title">Lista de Tareas</h5>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task of tasks" :key="task._id">
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td class="text-nowrap">
                    <button @click="editTask(task._id)" class="btn btn-sm btn-primary mr-2">
                      <i class="fas fa-edit"></i> Editar
                    </button>
                    <button @click="deleteTask(task._id)" class="btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

class Task {
  constructor(title = '', description = '') {
    this.title = title;
    this.description = description;
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
      if(this.edit === false) {
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
      }
      else {
        fetch('/api/tasks/' + this.taskToEdit, {
          method: 'PUT',
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
            this.edit = !this.edit;
          });
      }
    },
    getTasks() {
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
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
          const { _id, title, description } = data;
          this.task = new Task(title, description);
          this.taskToEdit = _id;
          this.edit = true;
        });
    }   
  }
}
</script>
