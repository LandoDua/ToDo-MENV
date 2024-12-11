<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">To Do List with MEVN</a>
    </nav>

    <div class="container m-3"></div>
    <div class="row m-2 d-flex justify-content-center">
      <div class="col-md-4 p-1">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendTask">
              <div class="form-group">
                <input
                  type="text"
                  v-model="task.title"
                  placeholder="Escribe una tarea"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <textarea
                  cols="30"
                  rows="10"
                  v-model="task.description"
                  class="form-control mt-2"
                  placeholder="Descripción de la tarea"
                ></textarea>
              </div>
              <template v-if="edit === false">
                <button class="btn btn-primary btn-block mt-2">Guardar</button>
              </template>
              <template v-else>
                <button class="btn btn-outline-primary btn-block mt-2">
                  Actualizar
                </button>
              </template>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-1">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task of tasks">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>
                <button
                  @click.prevent="
                    () => {
                      deleteTask(task._id);
                    }
                  "
                  class="btn btn-outline-danger"
                >
                  Eliminar
                </button>

                <button
                  @click.prevent="
                    () => {
                      editTask(task._id);
                    }
                  "
                  class="btn btn-secondary"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 

<script>
class Task {
  constructor(title, description) {
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
      idEditTask: "",
    };
  },
  created() {
    this.getTasks();
  },

  methods: {
    sendTask() {
      if (!this.edit) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getTasks();
          });
      } else {
        fetch("/api/tasks/" + this.idEditTask, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then(res => res.json())
        .then(data => this.getTasks())
        .then(data => this.edit = false)
      }

      // console.log(this.task);
      this.task = new Task();
    },

    getTasks() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          this.tasks = data;
          //   console.log(this.tasks);
        });
    },

    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          this.getTasks();
        });
      // console.log('Eliminando resgistro: ', id);
    },

    editTask(id) {
      // console.log('Editando: '+id)
      fetch("/api/tasks/" + id, () => {})
        .then((res) => res.json())
        .then((data) => {
          this.task = new Task(data.title, data.description);
          this.edit = true;
          this.idEditTask = data._id;
        });
    },
  },
  render() {
    return h("div");
  },
};
</script>
