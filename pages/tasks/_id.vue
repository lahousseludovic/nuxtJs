<template>
  <div class="container">
    <h2>
      {{ task.description }} : {{ task.isDone ? 'terminée.' : 'à faire !' }}
    </h2>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'vue-property-decorator'
import { Task } from '../../domain/task'

@Component({
  middleware(context: Context) {
    const taskId = context.route.params.id
    const existingTask = context.store.getters.taskById(taskId)
    if (existingTask) {
      return
    }
    context.store.dispatch('addTask', new Task(decodeURI(taskId)))
  },
})
export default class extends Vue {
  get task(): Task {
    const taskId = this.$route.params.id
    return this.$store.getters.taskById(taskId)
  }
}
</script>
