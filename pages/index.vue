<template>
  <task-list :tasks="tasks"></task-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Task } from '../domain/task'
import { getters } from '~/store'
import { Context } from '~/node_modules/@nuxt/types'
import TaskList from '~/components/TaskList.vue'

@Component({
  components: { TaskList },
  middleware({ store }: Context) {
    const tasks = store.getters.tasks

    if (tasks.length > 0) {
      return
    }

    const initialTasks: Array<Task> = [
      new Task('Modifier le store', false, ['WORK']),
      new Task('Modifier la page principale'),
      new Task('Créer une liste'),
    ]

    store.dispatch('initTasks', initialTasks)
  },
})
export default class extends Vue {
  get tasks(): Array<Task> {
    return (this.$store.getters as ReturnType<typeof getters.tasks>).tasks
  }
}
</script>
