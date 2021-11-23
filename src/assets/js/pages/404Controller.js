import { $content } from '../App'
import Error404 from '../components/404Error'

export const error404 = async () => {
  let error404markup = new Error404().markup()
  $content.innerHTML = error404markup
}
