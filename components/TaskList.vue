<template>
  <div class="container">
      <add-task></add-task>
    <ul>
      <li v-for="task in tasks" :key="task.id">
<!--        <nuxt-link :to="`/tasks/${task.id}`">{{ task.description }}</nuxt-link>-->
        <task-thumbnail :task="task"></task-thumbnail>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Task } from '~/domain/task'
import TaskThumbnail from '~/components/TaskThumbnail.vue';
import AddTask from '~/components/AddTask.vue';
@Component({
  components: {TaskThumbnail, AddTask}
})
export default class extends Vue {
  @Prop({validator(value: Task): boolean {
      return (
              !!value.id && !!value.description && typeof value.isDone === 'boolean'
      )
    }, type: Array, required: true, default: () => [] }) tasks!: Array<Task>
}
</script>
