import styles from './styles.css?inline'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import Contacts from './pages/Contacts'

export default {
  id: 'kava',
  name: 'KavaBAR',
  styles,
  Header,
  Footer,
  routes: [
    { path: '/', name: 'Головна', component: Home },
    { path: '/menu', name: 'Меню', component: Menu },
    { path: '/events', name: 'Події та новини', component: Events },
    { path: '/contacts', name: 'Контакти', component: Contacts },
  ],
}
