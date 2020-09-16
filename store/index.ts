import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Task } from '~/domain/task'

export const state = () => ({
  tasks: [] as Array<Task>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tasks: (state) => {
    return state.tasks
  },
  taskById(state) {
    return (id: string): Task | undefined => {
      return state.tasks.find((task: Task) => {
        return task.id === encodeURI(id)
      })
    }
  },
}

export const mutations: MutationTree<RootState> = {
  UPDATE_TASKS: (state, newTasks: Array<Task>) => (state.tasks = newTasks),
}

export const actions: ActionTree<RootState, RootState> = {
  initTasks({ commit }, tasks: Array<Task>) {
    commit('UPDATE_TASKS', tasks)
  },
  addTask({ commit, getters }, task: Task) {
    if (getters.taskById(task.id) === undefined) {
      const tasks: Task[] = getters.tasks;
      tasks.push(task);
      commit('UPDATE_TASKS', tasks)
    }
  },
  updateTask({ commit, getters }, newTask: Task) {
    if (getters.taskById(newTask.id) === undefined) {
      const tasks = getters.tasks.push(newTask)
      commit('UPDATE_TASKS', tasks)
    }
  },
  deleteTask({ commit, getters }, taskId: string) {
      const tasks: Task[] = getters.tasks;
      for(let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
          tasks.splice(i, 1);
          commit('UPDATE_TASKS', tasks);
        }
      }
  },
}
