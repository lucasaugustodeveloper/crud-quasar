<template>
  <q-page padding>
    <q-table title="Posts" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" color="negative" dense :label="props.row.name" @click="handleDeletePost(props.row.id)"
            size="sm" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import postsServices from 'src/services/posts'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const { list, remove } = postsServices()
    const $q = useQuasar()

    const posts = ref([])
    const columns = [
      { name: 'id', field: 'id', label: 'ID', align: 'left' },
      { name: 'title', field: 'title', label: 'Title', align: 'left' },
      { name: 'author', field: 'author', label: 'Author', align: 'left' },
      { name: 'content', field: 'content', label: 'Content', align: 'left' },
      { name: 'actions', field: 'actions', label: 'Actions', align: 'right' }
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()

        posts.value = data
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Delete post',
          message: 'Are you sure you want to delete',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)

          $q.notify({
            message: 'apagando com sucesso!',
            icon: 'check',
            color: 'positive',
            position: 'top-right'
          })

          await getPosts()
        })
      } catch (error) {
        $q.notify({
          message: 'Erro ao apagar o item',
          icon: 'times',
          color: 'warning',
          position: 'top-right'
        })
      }
    }

    return {
      posts,
      columns,
      handleDeletePost
    }
  }
})
</script>
