<template>
  <q-page padding >
    <q-table
      title="POSTS"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top>
        <span class="text-h5">POSTS</span>
        <q-space />
        <q-btn color="primary" icon="add" label="Novo Post" :to="{ name: 'formPost' }" />
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn round icon="edit " color="primary" @click="editPost(props.row.id)"/>
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postService()
    const router = useRouter()

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
        $q.dialog({
          title: 'Confirm',
          message: `Deseja realmente excluir o post de ID: ${id} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (error) {
        console.log(error)
        $q.notify({ message: 'Erro ao apagar post!', icon: 'times', color: 'negative' })
      }
    }

    const editPost = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      posts,
      columns,
      deletePost,
      editPost
    }
  }
})
</script>
