<template>
    <div class="container">
        <label for="add-task" class="label">Add something to do:</label>
        <div class="field columns is-0">
            <div class="control column">
                <input
                        v-model="description"
                        id="add-task"
                        class="input is-info is-rounded"
                        type="text"
                        placeholder="Create new todo"
                        @keyup.enter="addTask"
                />
            </div>
            <div class="control column is-1">
                <button
                        type="button"
                        class="button is-primary is-rounded"
                        @click="addTask"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Task} from "~/domain/task";

  @Component({})
  export default class extends Vue {

    description = "";

    addTask(): void {
      this.$store.dispatch('addTask', new Task(`${this.description}`));
      this.description = "";
    }
  }
</script>
