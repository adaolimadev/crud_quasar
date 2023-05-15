<template>
    <q-page padding>
        <q-form
          @submit="onSubmit"
          class="row q-col-gutter-sm"
        >
            <q-input
              outlined
              class="col-lg-6 col-xs-12"
              v-model="form.title"
              label="Título"
              lazy-rules=""
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
            >
            </q-input>
            <q-input
              outlined
              class="col-lg-6 col-xs-12"
              v-model="form.author"
              label="Autor"
              lazy-rules=""
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
            >
            </q-input>
            <div class="col-lg-12 col-xs-12">
                <q-editor v-model="form.content" min-height="5rem" :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"/>
            </div>

            <div class="col-12 q-gutter-sm">
                <q-btn label="Cancelar" color="negative" class="float-right" icon="close" :to="{ name: 'home' }" ></q-btn>
                <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"></q-btn>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'FormPost',
  setup () {
    const { post, getById, update } = postService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      title: '',
      author: '',
      content: ''
    })

    onMounted(async () => {
      if (route.params.id) {
        getPost(route.params.id)
      }
    })

    const getPost = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.error(error)
      }
    }

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
          $q.notify({ message: 'Post alterado com sucesso!', icon: 'check', color: 'positive' })
          router.push({ name: 'home' })
        } else {
          await post(form.value)
          $q.notify({ message: 'Post criado com sucesso!', icon: 'check', color: 'positive' })
          router.push({ name: 'home' })
        }
      } catch (error) {
        console.log(error)
      }
    }
    return {
      form,
      onSubmit,
      getPost
    }
  }
})
</script>
