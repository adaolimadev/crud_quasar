<template>
  <q-page padding >
    <q-table
      title="POSTS"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round icon="delete" color="negative" @click="deletePost(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postService from 'src/services/posts'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postService()

    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'Titulo', sortable: true, align: 'left' },
      { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'center' }
    ]

    const $q = useQuasar()

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const response = await list()
        posts.value = response
      } catch (error) {
        console.log(error)
      }
    }

    const deletePost = async (id) => {
      try {
        await remove(id)
        $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
        await getPosts()
      } catch (error) {
        console.log(error)
        $q.notify({ message: 'Erro ao apagar post!', icon: 'times', color: 'negative' })
      }
    }

    return {
      posts,
      columns,
      deletePost
    }
  }
})
</script>
