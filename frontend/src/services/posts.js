import useApi from 'src/composables/useApi'

export default function postService () {
  const { list, post, update, remove } = useApi('posts')

  return {
    list,
    post,
    update,
    remove
  }
}
