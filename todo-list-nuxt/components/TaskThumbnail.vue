<template>
  <div class="columns" :class="{ 'is-done': task.isDone }">
    <div class="column is-three-quarters">
      <nuxt-link :to="`/tasks/${task.id}`">
        <span>{{ task.description }}</span>
        <span class="tags">
          <span v-for="tag in task.tags" :key="tag" class="tag is-small">
            {{ tag }}
          </span>
        </span>
      </nuxt-link>
    </div>
    <div class="column auto">
      <button
        class="button is-success is-outlined"
        type="button"
        @click="checkTask"
      >
        Done
      </button>
    </div>
    <div class="column auto">
      <button
        class="button is-danger is-outlined"
        type="button"
        @click="deleteTask"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Task } from '~/domain/task'

@Component
export default class extends Vue {
  @Prop({required: true, default: () => new Task('') }) task!: Task

  checkTask() {
    const newTask = new Task(this.task.description, !this.task.isDone)
    this.$store.dispatch('updateTask', newTask)
  }

  deleteTaskk() {
    this.$store.dispatch('deleteTask', this.task.id)
  }
}
</script>

<style scoped>
.is-done {
  text-decoration: line-through;
}
</style>
